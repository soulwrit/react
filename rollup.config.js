import path from 'path';
import glob from 'glob';
import fs from 'fs-extra';

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
// import { eslint } from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import uglify from 'rollup-plugin-uglify';
import url from 'rollup-plugin-url';
import image from '@rollup/plugin-image';
import svgr from '@svgr/rollup';

import cssnano from 'cssnano';
import postcss from 'postcss';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import postcssUtilities from 'postcss-utilities';
import rmdirpSync from '@writ/utils/node-rmdirp-sync';

const env = String(process.env.NODE_ENV || 'development').trim();
const isEnvDevelopment = env === 'development';
const isEnvProduction = env === 'production';
const distDirectory = path.resolve('dist');
const utils = {
   getInput() {
      const input = {
         index: './index.js'
      };

      glob.sync('./lib/*.js').forEach(pathname => {
         const basename = path.parse(pathname).name;
         input[basename.toLowerCase()] = pathname;
      });

      return input;
   },
   genStyle(content, chunks) {
      fs.writeFile('dist/css/main.css', content);
      chunks.forEach(({ id, content }) => {
         fs.writeFile(`dist/css/${path.parse(id).name.toLowerCase()}.css`, content);
      });
   },
   isESM(mode) {
      return mode === 'esm';
   }
};

function configFactory(mode = 'esm') {
   if (fs.existsSync(distDirectory)) {
      rmdirpSync(distDirectory, { clean: true });
   }

   const options = {
      input: utils.getInput(),
      output: {
         dir: `dist/${mode}`,
         format: mode,
         strict: true,
         experimentalCodeSplitting: utils.isESM(mode),
      },
      treeshake: utils.isESM(mode),
      plugins: [
         // eslint(),
         resolve(),
         babel({
            exclude: 'node_modules/*'
         }),
         commonjs(),
         sass({
            // options: {
            //    data: ''
            // },
            include: /\.scss/,
            output(main, chunks) {
               utils.genStyle(main, chunks);
            },
            processor: css => postcss([
               postcssUtilities(),
               postcssPresetEnv(),
               postcssNested(),
               cssnano(),
            ]).process(css).then(res => res.css)
         }),
         url({
            limit: 10 * 1024, // inline files < 10k, copy files > 10k 
            emitFiles: true   // defaults to true
         }),
         svgr({
            include: ['../icons/*', './lib/**']
         }),
         image({
            exclude: ['*.svg', '*.svgo']
         }),
         replace({
            include: ['./lib/_config.js'],
            values: {
               VERSION: '1.0.0',
               ENVIRONMENT: JSON.stringify(env),
               AUTHOR: '田路刚',
               AUTHOR_EMAIL: '2678962889@qq.com',
               LIB_WEBSITE: 'www.baidu.com'
            }
         }),
         copy({
            targets: [
               { src: '../scss/components/icon/font/*', dest: 'dist/css/font' },
               { src: '../scss/components/iconElegantEditor/font/*', dest: 'dist/css/refont' },
            ]
         }),
         isEnvProduction && uglify()
      ]
   };

   if (isEnvDevelopment) {
      options.watch = {
         exclude: ['./rollup.config.js']
      };
   }

   if (mode == 'umd') {
      options.external = ['react', 'prop-types', 'classnames'];
   }

   return options;
}

export default configFactory();