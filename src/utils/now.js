/**
 * Returns now date as string with specified format
 * @memberof module:Utils
 * @param {string} format d is for day, M is for month, Y is for full year
 */
jcdu.utils.now = function (format) {
    var now = new Date();
    return jcdu.utils.getFormattedDate(now, format);
};