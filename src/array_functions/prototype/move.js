/**
 * Moves array's element from old_index to new_index
 * @memberof module:ArrayFunctions
 * @param {number} old_index Old index
 * @param {number} new_index New index
 * @returns {Array}
 */
Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this;
};