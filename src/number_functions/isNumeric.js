/**
 * Returns true if n is numeric, false otherwise
 * @param {object} n
 * @returns {boolean}
 */
jcdu.numberFunctions.isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};