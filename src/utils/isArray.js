/**
 * Returns true if object is array, false otherwise
 * @memberof module:Utils
 * @param object
 * @returns {boolean}
 */
CHIEF.utils.isArray = function (object) {
    if (Array.isArray === undefined) {
        return Object.prototype.toString.call(object) === '[object Array]';
    } else {
        return Array.isArray(object);
    }
};