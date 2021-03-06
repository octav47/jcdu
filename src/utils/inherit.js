/**
 * Inherits first object from second
 * @memberof module:Utils
 * @param {object} object
 * @param {object} parent
 */
CHIEF.inherit = function (object, parent) {
    object.prototype = Object.create(parent.prototype);
};

CHIEF.utils.inherit = CHIEF.inherit;