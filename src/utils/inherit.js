/**
 * Inherits first object from second
 * @param {object} object
 * @param {object} parent
 */
jcdu.inherit = function (object, parent) {
    object.prototype = Object.create(parent.prototype);
};

jcdu.utils.inherit = jcdu.inherit;