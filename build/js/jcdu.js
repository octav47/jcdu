/*
* main file
 */

(function () {
    var jcdu = {};

    if (!window.jcdu) {
        window.jcdu = jcdu;
    }

    jcdu.browserFunctions = {};
    jcdu.browserFunctions.isFirefox = function () {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    };



    Array.prototype.clean = function(deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };
    Array.prototype.mapJoinString = function (separator, prefix, suffix) {
        separator = (separator === undefined) ? '' : separator;
        prefix = (prefix === undefined) ? '' : prefix;
        suffix = (suffix === undefined) ? '' : suffix;
        return this.map(function (e) {
            return prefix + e + suffix;
        }).join(separator);
    };



    jcdu.stringFunctions = {};
    jcdu.stringFunctions.truncate = function (str, maxlength) {
        if (!str) {
            return '';
        }
        if (!maxlength) {
            maxlength = 20;
        }
        return (str.length > maxlength) ? str.slice(0, maxlength - 3) + '...' : str;
    };

    String.prototype.truncate = function (maxlength) {
        if (!this) {
            return '';
        }
        if (!maxlength) {
            maxlength = 20;
        }
        return (this.length > maxlength) ? this.slice(0, maxlength - 3) + '...' : this;
    };



    jcdu.numberFunctions = {};
    jcdu.numberFunctions.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    jcdu.numberFunctions.getRandomNumber = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    jcdu.numberFunctions.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
})();