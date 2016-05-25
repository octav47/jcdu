jcdu.utils.isArray = function (object) {
    if (Array.isArray === undefined) {
        return Object.prototype.toString.call(object) === '[object Array]';
    } else {
        return Array.isArray(object);
    }
};