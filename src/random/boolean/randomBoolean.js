/**
 * Returns a random boolean
 * @memberof module:Random
 * @returns {boolean}
 */
jcdu.random.bool = function () {
    return _m.floor(_m.random() * 2) > 0.5;
};