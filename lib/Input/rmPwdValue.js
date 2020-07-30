export const rmPwdValue = (type, el) => {
    if (type === 'password') {
        if (el.hasAttribute('value')) {
            el.removeAttribute('value');
        }
    }
}