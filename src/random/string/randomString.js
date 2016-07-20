/**
 * Returns a random string
 * @memberof module:Random
 * @param {int} length Length of a string
 * @returns {string}
 */
jcdu.random.string = function (length) {
    length = length || 10;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};