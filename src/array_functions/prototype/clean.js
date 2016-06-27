/**
 * Remove all occurrences of deleteValue if array
 * @param deleteValue
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