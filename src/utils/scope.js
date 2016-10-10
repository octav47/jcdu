/**
 * Create scope for function
 * makes context global
 * @param {Function} callback
 * @returns {*}
 */
jcdu.scope = function (callback) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return callback.apply(null, args);
};

jcdu.utils.scope = jcdu.scope;