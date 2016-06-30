/**
 *
 * @memberof module:Objects
 * @class
 * @extends {jcdu.o.Abstract}
 * @constructor
 */
jcdu.o.Iterator = function () {};

jcdu.inherit(jcdu.o.Iterator, jcdu.o.Abstract);

jcdu.o.Iterator.prototype.getClass = function () {
    return 'jcdu.o.Iterator';
};

/**
 *
 * @type {*|string}
 */
jcdu.o.Iterator.prototype.hasNext = jcdu.o.Abstract.method;

/**
 *
 * @type {*|string}
 */
jcdu.o.Iterator.prototype.next = jcdu.o.Abstract.method;

/**
 *
 * @type {*|string}
 */
jcdu.o.Iterator.prototype.remove = jcdu.o.Abstract.method;