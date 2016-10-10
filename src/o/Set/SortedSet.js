/**
 *
 * @memberof module:Objects
 * @class
 * @extends {CHIEF.o.Set}
 * @constructor
 */
CHIEF.o.SortedSet = function() {};
CHIEF.inherit(CHIEF.o.SortedSet, CHIEF.o.Set);

/**
 *
 * @override
 * @returns {string}
 */
CHIEF.o.SortedSet.prototype.getClass = function () {
    return 'o.SortedSet';
};