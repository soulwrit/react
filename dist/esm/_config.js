var environment = '"development"';
var version = '1.0.0';
var author = '田路刚';
var authorEmail = '2678962889@qq.com';
var libWebsite = 'www.baidu.com';
var DEV = environment === 'development';
console.log('Current environment is', environment);
console.log('Author and Copy-Right', author, 'E-mail', authorEmail);
console.log('Lib Version', version);
console.log('Lib Website, you can find Doc and Demo', libWebsite);
window.DEV = DEV;

window.__SET_ENV_TO_DEV__ = function __SET_ENV_TO_DEV__() {
  window.DEV = true;
};

export { DEV, version };
