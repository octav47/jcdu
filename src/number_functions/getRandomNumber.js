/**
 * Returns random float from specified range from min to max
 * @memberof module:NumberFunctions
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
jcdu.numberFunctions.getRandomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
};