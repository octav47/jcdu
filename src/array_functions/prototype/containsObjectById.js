/**
 * Returns true if array contains object with specified id, false otherwise
 * @memberof module:ArrayFunctions
 * @deprecated
 * @param {number} id Object's ID
 * @returns {boolean}
 */
Array.prototype.containsObjectById = function (id) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].id === id) {
            return true;
        }
    }
    return false;
};