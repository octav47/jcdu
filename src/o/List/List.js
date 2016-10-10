/**
 *
 * @memberof module:Objects
 * @class
 * @extends {CHIEF.o.Collection}
 * @constructor
 */
CHIEF.o.List = function() {};
CHIEF.inherit(CHIEF.o.List, CHIEF.o.Collection);

/**
 *
 * @type {*|string}
 */
CHIEF.o.List.prototype.get = CHIEF.o.Abstract.method;

/**
 *
 * @type {*|string}
 */
CHIEF.o.List.prototype.set = CHIEF.o.Abstract.method;

/**
 *
 * @type {*|string}
 */
CHIEF.o.List.prototype.isEmpty = CHIEF.o.Abstract.method;