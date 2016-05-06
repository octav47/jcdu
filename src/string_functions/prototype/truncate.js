String.prototype.truncate = function (maxlength) {
    if (!maxlength) {
        maxlength = 20;
    }
    return (this.length > maxlength) ? this.slice(0, maxlength - 3) + '...' : this;
};