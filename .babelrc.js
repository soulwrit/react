
module.exports = {
   presets: [
      require('@babel/preset-env'),
      require('@babel/preset-react'),
   ],
   plugins: [
      require('@babel/plugin-proposal-class-properties'),
      require('@babel/plugin-syntax-dynamic-import'),
      require('@babel/plugin-transform-react-jsx'),
      require('@babel/plugin-transform-flow-strip-types')
   ],
   ignore: [
      'dist/*.js'
   ]
}