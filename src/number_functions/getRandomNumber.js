/**
 * Returns random float from specified range from min to max
 * @memberof module:NumberFunctions
 * @deprecated
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
jcdu.numberFunctions.getRandomNumber = function (min, max) {
    return jcdu.random.number(min, max);
};