/**
 * Truncates string and replaces last three characters with '...', if string length is more than maxlength
 * @memberof module:StringFunctions
 * @param {number} maxlength
 * @returns {string}
 */
String.prototype.truncate = function (maxlength) {
    if (!this) {
        return '';
    }
    if (!maxlength) {
        maxlength = 20;
    }
    return (this.length > maxlength) ? this.slice(0, maxlength - 3) + '...' : this;
};