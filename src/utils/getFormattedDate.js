/**
 * Returns date as string with specified format
 * @memberof module:Utils
 * @param {Object} date
 * @param {string} format d is for day, M is for month, Y is for full year
 */
CHIEF.utils.getFormattedDate = function (date, format) {
    var day = date.getDate() + '';
    if (day < 10) {
        day = '0' + day;
    }

    var month = (date.getMonth() + 1) + '';
    if (month < 10) {
        month = '0' + month;
    }

    var year = date.getFullYear() + '';

    return format
        .replace('d', day)
        .replace('M', month)
        .replace('Y', year);
};