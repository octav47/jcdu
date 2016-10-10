/**
 *
 * @memberof module:Objects
 * @class
 * @extends {Error}
 * @param {string} message Error message
 * @constructor
 */
CHIEF.o.NoSuchElementException = function(message) {
    this.message = message || '';
};
CHIEF.inherit(CHIEF.o.NoSuchElementException, Error);

CHIEF.o.NoSuchElementException.prototype.name = 'NoSuchElementException';