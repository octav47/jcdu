/**
 * Maps array's with prefix and suffix, then joins them with separator
 * Without parameters joins array with comma
 * @memberof module:ArrayFunctions
 * @param {...args} args
 * @param {string} [args.separator]
 * @param {string} [args.prefix]
 * @param {string} [args.suffix]
 * @param {Function} [args.replacer]
 * @returns {string}
 *
 * @example
 * [1,2,3,4,5].mapJoinString();
 * // returns "1,2,3,4,5"
 *
 * @example
 * [1,2,3,4,5].mapJoinString('.');
 * // returns "1.2.3.4.5"
 *
 * @example
 * [1,2,3,4,5].mapJoinString(',', 'a');
 * // returns "a1a,a2a,a3a,a4a,a5a"
 *
 * @example
 * [1,2,3,4,5].mapJoinString('.', 'tag#a');
 * // returns "<a>1</a>.<a>2.</a><a>3.</a><a>4</a>.<a>5</a>"
 *
 * @example
 * [1,2,3,4,5].mapJoinString(',', 'p', 's');
 * // returns "p1s,p2s,p3s,p4s,p5s"
 *
 * @example
 * [1,null,3,undefined,5].mapJoinString(',', 'p', 's', function (e) { return e || ''; });
 * // returns "p1s,ps,p3s,ps,p5s"
 */
Array.prototype.mapJoinString = function () {
    var args = Array.prototype.slice.call(arguments);
    var separator, prefix, suffix, replacer;

    // simply joining
    if (args.length === 0) {
        return this.join(',');
    }

    // join with separator
    if (args.length === 1) {
        separator = args[0];
        return this.join(separator);
    }

    /**
     * join with separator and affix (it means, that prefix equals suffix)
     * if affix starts with 'tag#' (ex. 'tag#tr'), then prefix will be opening tag, and suffix will be closing tag
     */
    if (args.length === 2) {
        separator = args[0];
        var affix = args[1];
        if (affix.indexOf('tag#') === 0) {
            affix = affix.replace('tag#', '');
            prefix = '<' + affix + '>';
            suffix = '</' + affix + '>';
            return this.map(function (e) {
                return prefix + e + suffix;
            }).join(separator);
        } else {
            return this.map(function (e) {
                return affix + e + affix;
            }).join(separator);
        }
    }

    separator = args[0] || '';
    prefix = args[1] || '';
    suffix = args[2] || '';
    replacer = args[3] || function (e) { return e; };
    return this.map(function (e) {
        return prefix + replacer(e) + suffix;
    }).join(separator);
};