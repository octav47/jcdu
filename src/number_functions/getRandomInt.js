/**
 * Return random int from specified range from min to max (both inclusive)
 * @memberof module:NumberFunctions
 * @deprecated
 * @param {number} min
 * @param {number} max
 * @returns {*}
 */
CHIEF.numberFunctions.getRandomInt = function (min, max) {
    return CHIEF.random.int(min, max);
};