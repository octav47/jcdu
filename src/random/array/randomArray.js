/**
 * Returns a random array
 * @memberof module:Random
 * @param {int} length Length of an array
 * @param {string} type Type of elements
 * @param {object} options Options
 * @returns {Array}
 */
jcdu.random.array = function (length, type, options) {
    length = length || 0;
    type = type || 'int';
    options = options || {
            min: 0,
            max: 1,
            length: 10
        };

    var array = [];

    var randomElement;

    var optName1, optName2;

    switch (type) {
        case 'number':
            randomElement = jcdu.random.number;
            optName1 = 'min';
            optName2 = 'max';
            break;
        case 'int':
            randomElement = jcdu.random.int;
            optName1 = 'min';
            optName2 = 'max';
            break;
        case 'string':
            randomElement = jcdu.random.string;
            optName1 = 'length';
            optName2 = null;
            break;
        case 'boolean':
            randomElement = jcdu.random.boolean;
            optName1 = null;
            optName2 = null;
            break;
        default:
            randomElement = jcdu.random.int;
    }

    for (var i = 0; i < length; i++) {
        array.push(randomElement(options[optName1], options[optName2]));
    }

    return array;
};