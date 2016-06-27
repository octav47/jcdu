/**
 * Return random int from specified range from min to max (both inclusive)
 * @param {number} min
 * @param {number} max
 * @returns {*}
 */
jcdu.numberFunctions.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};