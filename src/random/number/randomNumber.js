/**
 * Returns a random number
 * @memberof module:Random
 * If there is no params - returns Math.random()
 *
 * If one param N - returns random in [0; N)
 *
 * If params are N and M - returns random in [N; M)
 *
 * @returns {number}
 */
jcdu.random.number = function () {
    var args = Array.prototype.slice.call(arguments);

    if (args.length === 0) {
        return _m.random();
    }

    if (args.length === 1) {
        return _m.random() * args[0];
    }

    if (args.length === 2) {
        return _m.random() * (args[1] - args[0]) + args[0];
    }

    return _m.random() * (args[1] - args[0]) + args[0];
};