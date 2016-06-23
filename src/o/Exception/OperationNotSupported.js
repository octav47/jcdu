/**
 *
 * @class
 * @extends {Error}
 * @param message
 * @constructor
 */
jcdu.o.OperationNotSupported = function(message) {
    this.message = message || '';
};
jcdu.inherit(jcdu.o.OperationNotSupported, Error);

jcdu.o.OperationNotSupported.prototype.name = 'OperationNotSupported';