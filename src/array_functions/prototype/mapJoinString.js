/**
 * Maps array's with prefix and suffix, then joins them with separator
 * @memberof module:ArrayFunctions
 * @param {string} separator
 * @param {string} prefix
 * @param {string} suffix
 * @returns {string}
 */
Array.prototype.mapJoinString = function (separator, prefix, suffix) {
    separator = (separator === undefined) ? '' : separator;
    prefix = (prefix === undefined) ? '' : prefix;
    suffix = (suffix === undefined) ? '' : suffix;
    return this.map(function (e) {
        return prefix + e + suffix;
    }).join(separator);
};