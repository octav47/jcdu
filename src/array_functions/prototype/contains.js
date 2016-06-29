/**
 * Returns true if array contains obj, false otherwise
 * @memberof module:ArrayFunctions
 * @param obj
 * @returns {boolean}
 */
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};