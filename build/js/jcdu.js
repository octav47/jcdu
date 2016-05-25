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
            if (this[i] === deleteValue) {
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
    Array.prototype.move = function (old_index, new_index) {
        while (old_index < 0) {
            old_index += this.length;
        }
        while (new_index < 0) {
            new_index += this.length;
        }
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        return this;
    };
    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    };
    Array.prototype.containsObjectById = function (id) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].id === id) {
                return true;
            }
        }
        return false;
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



    jcdu.utils = {};
    jcdu.utils.extend = function(out) {
        out = out || {};
    
        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;
    
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }
    
        return out;
    };
    jcdu.utils.argumentsToArray = function (arguments) {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }
        return args;
    };
    jcdu.utils.inherit = function (object, parent) {
        object.prototype = Object.create(parent.prototype);
    };
    
    Object.prototype.inherit = function (parent) {
        this.prototype = Object.create(parent.prototype);
    };
    jcdu.utils.isArray = function (object) {
        if (Array.isArray === undefined) {
            return Object.prototype.toString.call(object) === '[object Array]';
        } else {
            return Array.isArray(object);
        }
    };
})();