const environment = 'ENVIRONMENT';
const version = 'VERSION';
const author = 'AUTHOR';
const authorEmail = 'AUTHOR_EMAIL';
const libWebsite = 'LIB_WEBSITE';

const DEV = environment === 'development';
console.log('Current environment is', environment);
console.log('Author and Copy-Right', author, 'E-mail', authorEmail);
console.log('Lib Version', version);
console.log('Lib Website, you can find Doc and Demo', libWebsite);

window.DEV = DEV;
window.__SET_ENV_TO_DEV__ = function __SET_ENV_TO_DEV__() {
    window.DEV = true;
}
export {
    DEV,
    version
}