/**
 * Returns true if object is array, false otherwise
 * @param object
 * @returns {boolean}
 */
jcdu.utils.isArray = function (object) {
    if (Array.isArray === undefined) {
        return Object.prototype.toString.call(object) === '[object Array]';
    } else {
        return Array.isArray(object);
    }
};