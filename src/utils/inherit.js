jcdu.utils.inherit = function (object, parent) {
    object.prototype = Object.create(parent.prototype);
};

jcdu.inherit = jcdu.utils.inherit;