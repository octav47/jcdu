/**
 *
 * @memberof module:Objects
 * @class
 * @extends {Error}
 * @param message
 * @constructor
 */
CHIEF.o.OperationNotSupported = function(message) {
    this.message = message || '';
};
CHIEF.inherit(CHIEF.o.OperationNotSupported, Error);

CHIEF.o.OperationNotSupported.prototype.name = 'OperationNotSupported';