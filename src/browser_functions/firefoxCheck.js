/**
 * Returns true if browser is Firefox, false otherwise
 * @memberof module:BrowserFunctions
 * @returns {boolean}
 */
jcdu.browserFunctions.isFirefox = function () {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
};