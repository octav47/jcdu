/**
 *
 * @class
 * @extends {jcdu.o.Collection}
 * @constructor
 */
jcdu.o.List = function() {};
jcdu.inherit(jcdu.o.List, jcdu.o.Collection);

/**
 *
 * @type {*|string}
 */
jcdu.o.List.prototype.get = jcdu.o.Abstract.method;

/**
 *
 * @type {*|string}
 */
jcdu.o.List.prototype.set = jcdu.o.Abstract.method;

/**
 *
 * @type {*|string}
 */
jcdu.o.List.prototype.isEmpty = jcdu.o.Abstract.method;