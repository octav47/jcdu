/**
 * Returns a random array
 * @memberof module:Random
 * @param {int} length Length of an array
 * @param {string} type Type of elements
 * @returns {Array}
 */
jcdu.random.array = function (length, type, options) {
    length = length || 0;
    type = type || 'int';
    options = options || {
            min: 0,
            max: 1
        };

    var array = [];

    var randomElement;

    switch (type) {
        case 'number':
            randomElement = jcdu.random.number;
            break;
        case 'int':
            randomElement = jcdu.random.int;
            break;
        case 'string':
            randomElement = jcdu.random.string;
            break;
        case 'boolean':
            randomElement = jcdu.random.boolean;
            break;
        default:
            randomElement = jcdu.random.int;
    }

    for (var i = 0; i < length; i++) {
        array.push(randomElement(options.min, options.max));
    }

    return array;
};