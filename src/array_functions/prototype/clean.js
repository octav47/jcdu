/**
 * Remove all occurrences of deleteValue if array
 * @memberof module:ArrayFunctions
 * @param {object} deleteValue Value to be deleted
 * @returns {Array}
 */
Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};