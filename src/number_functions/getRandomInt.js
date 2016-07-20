/**
 * Return random int from specified range from min to max (both inclusive)
 * @memberof module:NumberFunctions
 * @deprecated
 * @param {number} min
 * @param {number} max
 * @returns {*}
 */
jcdu.numberFunctions.getRandomInt = function (min, max) {
    return jcdu.random.int(min, max);
};