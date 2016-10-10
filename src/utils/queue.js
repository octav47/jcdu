/**
 * Queue for functions, each function in parameter gets input from the previous function output
 * Last parameter is an argument for first function
 * @returns {*}
 */
CHIEF.queue = function () {
    var args = [].slice.call(arguments);

    var result = args[args.length - 1];
    args.pop();

    for (var i = 0; i < args.length; i++) {
        result = args[i](result);
    }

    return result;
};