/**
 *
 * @memberof module:Objects
 * @class
 * @extends {CHIEF.o.Abstract}
 * @constructor
 */
CHIEF.o.Iterator = function () {};

CHIEF.inherit(CHIEF.o.Iterator, CHIEF.o.Abstract);

CHIEF.o.Iterator.prototype.getClass = function () {
    return 'o.Iterator';
};

/**
 *
 * @type {*|string}
 */
CHIEF.o.Iterator.prototype.hasNext = CHIEF.o.Abstract.method;

/**
 *
 * @type {*|string}
 */
CHIEF.o.Iterator.prototype.next = CHIEF.o.Abstract.method;

/**
 *
 * @type {*|string}
 */
CHIEF.o.Iterator.prototype.remove = CHIEF.o.Abstract.method;