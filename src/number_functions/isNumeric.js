/**
 * Returns true if n is numeric, false otherwise
 * @memberof module:NumberFunctions
 * @param {object} n
 * @returns {boolean}
 */
CHIEF.numberFunctions.isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};