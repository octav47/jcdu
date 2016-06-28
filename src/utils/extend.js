/**
 * Extends obj with other objects in arguments
 * @param obj
 * @returns {object}
 */
jcdu.utils.extend = function(obj) {
    obj = obj || {};

    for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i])
            continue;

        for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key))
                obj[key] = arguments[i][key];
        }
    }

    return obj;
};