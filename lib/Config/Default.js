/**
 * @returns {Object}
 * 
 */
export function getDefault() {
    const { host } = new URL(window.location);
    const lowerCaseHost = host.toLowerCase();

    const config = {
        appName: lowerCaseHost,
        appTitle: lowerCaseHost.concat(' 显示'),
    };

    getDefault = () => config;

    return getDefault();
}

export const DEFAULT = getDefault();
