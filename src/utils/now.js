/**
 * Returns now date as string with specified format
 * @memberof module:Utils
 * @param {string} format d is for day, M is for month, Y is for full year
 */
CHIEF.utils.now = function (format) {
    format = format || 'd-M-Y';
    var now = new Date();
    return CHIEF.utils.getFormattedDate(now, format);
};