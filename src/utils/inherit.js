jcdu.utils.inherit = function (object, parent) {
    object.prototype = Object.create(parent.prototype);
};

Object.prototype.inherit = function (parent) {
    this.prototype = Object.create(parent.prototype);
};