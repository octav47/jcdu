/**
 * Returns a random int
 * @memberof module:Random
 * If there is no params - returns [0; 1]
 *
 * If one param N - returns random in [0; N]
 *
 * If params are N and M - returns random in [N; M]
 *
 * @returns {int}
 */
jcdu.random.int = function () {
    var args = Array.prototype.slice.call(arguments);

    if (args.length === 0) {
        return _m.floor(_m.random() * 2);
    }

    if (args.length === 1) {
        return _m.floor(_m.random() * (args[0] + 1));
    }

    if (args.length === 2) {
        return _m.floor(_m.random() * (args[1] - args[0] + 1)) + args[0];
    }

    return _m.floor(_m.random() * (args[1] - args[0] + 1)) + args[0];
};