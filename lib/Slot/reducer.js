export const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case 'set':
            newState = {
                [action.name]: action.node
            };
            break;
        default:
            break;
    }
    return Object.assign({}, state, newState);
}