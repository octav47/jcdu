/**
 *
 * @memberof module:Objects
 * @class
 * @extends {jcdu.o.Set}
 * @constructor
 */
jcdu.o.SortedSet = function() {};
jcdu.inherit(jcdu.o.SortedSet, jcdu.o.Set);

/**
 *
 * @override
 * @returns {string}
 */
jcdu.o.SortedSet.prototype.getClass = function () {
    return 'jcdu.o.SortedSet';
};