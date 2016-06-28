/**
 * Truncates string and replaces last three characters with '...', if string length is more than maxlength
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
jcdu.stringFunctions.truncate = function (str, maxlength) {
    if (!str) {
        return '';
    }
    if (!maxlength) {
        maxlength = 20;
    }
    return (str.length > maxlength) ? str.slice(0, maxlength - 3) + '...' : str;
};