/**
 * Returns function's arguments as array
 * @memberof module:Utils
 * @param {object} args Arguments
 * @returns {Array}
 */
jcdu.utils.argumentsToArray = function (args) {
    var a = [];
    for (var i = 0; i < args.length; i++) {
        a[i] = args[i];
    }
    return a;
};