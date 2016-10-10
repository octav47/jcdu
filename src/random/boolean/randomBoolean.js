/**
 * Returns a random boolean
 * @memberof module:Random
 * @returns {boolean}
 */
CHIEF.random.bool = function () {
    return _m.floor(_m.random() * 2) > 0.5;
};