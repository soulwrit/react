import { createContext } from 'react';

export function createNamedContext(name) {
    const context = createContext();

    context.displayName = name;
    return context;
}

export default createNamedContext('viewBox');