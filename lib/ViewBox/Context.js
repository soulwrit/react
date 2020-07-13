import React from 'react';

export function createNamedContext(name) {
    const context = React.createContext();

    context.displayName = name;
    return context;
}

export default createNamedContext('viewBox');