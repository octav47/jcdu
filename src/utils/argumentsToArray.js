/**
 * Returns function's arguments as array
 * @memberof module:Utils
 * @returns {Array}
 */
jcdu.utils.argumentsToArray = function () {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
    }
    return args;
};