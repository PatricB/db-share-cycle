/**
 * Get full path based on location
 *
 * @param  {Location|URL} location
 * @return {String}
 */
export function getFullUrlPath (location) {
    return location.protocol + '//' + location.hostname +
        ':' + (location.port || (location.protocol === 'https:' ? '443' : '80')) +
        (/^\//.test(location.pathname) ? location.pathname : '/' + location.pathname);
}
