/**
 * Create scope for function
 * makes context global
 * @param {Function} callback
 * @returns {*}
 */
CHIEF.scope = function (callback) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return callback.apply(null, args);
};

CHIEF.utils.scope = CHIEF.scope;