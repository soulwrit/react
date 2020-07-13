function addListen() {
    return
}

function addEventListen(type, listen) {
    document.body.addEventListener('keyup', onKeyUp, false);
    return function rmEventListen() {
        document.body.removeEventListener('keyup', onKeyUp, false);
    };
}