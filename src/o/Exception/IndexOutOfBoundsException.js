/**
 *
 * @memberof module:Objects
 * @class
 * @extends {Error}
 * @param message
 * @constructor
 */
CHIEF.o.IndexOutOfBoundsException = function(message) {
    this.message = message || '';
};
CHIEF.inherit(CHIEF.o.IndexOutOfBoundsException, Error);

CHIEF.o.IndexOutOfBoundsException.prototype.name = 'IndexOutOfBoundsException';