/**
 * Returns random float from specified range from min to max
 * @memberof module:NumberFunctions
 * @deprecated
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
CHIEF.numberFunctions.getRandomNumber = function (min, max) {
    return CHIEF.random.number(min, max);
};