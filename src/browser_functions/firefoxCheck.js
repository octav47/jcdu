/**
 * Returns true if browser is Firefox, false otherwise
 * @memberof module:BrowserFunctions
 * @returns {boolean}
 */
CHIEF.browserFunctions.isFirefox = function () {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
};