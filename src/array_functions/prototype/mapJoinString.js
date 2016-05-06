Array.prototype.mapJoinString = function (separator, prefix, suffix) {
    separator = (separator === undefined) ? '' : separator;
    prefix = (prefix === undefined) ? '' : prefix;
    suffix = (suffix === undefined) ? '' : suffix;
    return this.map(function (e) {
        return prefix + e + suffix;
    }).join(separator);
};