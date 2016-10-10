/**
 * @namespace jcdu
 */
(/** @lends jcdu */ function (window, undefined) {
    var CHIEF = {}; // this is the main object

    if (!window.jcdu) {
        window.jcdu = CHIEF;
    }

    (function () {
        /** @module Utils */
        CHIEF.utils = {};
    
        /**
         * Extends jcdu object
         * @memberof module:Utils
         * @param {string} propertyName Name of propery to be extended
         * @param {Function} [extension] Callback for extension
         */
        jcdu.fn = function (propertyName, extension) {
            if (this[propertyName] === undefined && extension === undefined) {
                this[propertyName] = {};
            } else {
                this[propertyName] = extension;
                //extension(this[propertyName]);
            }
        };
        
        /**
         * Plugs an extension
         * @memberof module:Utils
         * @param {string} pluginName Plugin name
         * @param {Function} extension Plugin body
         *
         * @example
         * // Create a plugin, that alerts 'Hello, World!'
         * jcdu.plug('helloworld', function () {
         *     alert('Hello, World!');
         * });
         *
         * // Invoke new helloworld-plugin
         * jcdu.plugin.helloworld();
         *
         * // or shorter
         * jcdu.p.helloworld();
         */
        jcdu.plug = function (pluginName, extension) {
            if (this[pluginName] !== undefined) {
                throw 'Plugin name ' + pluginName + ' is already in use';
            } else {
                this.fn(pluginName, extension);
            }
        };
        /**
         * Create scope for function
         * makes context global
         * @param {Function} callback
         * @returns {*}
         */
        jcdu.scope = function (callback) {
            var args = [];
            for (var i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            return callback.apply(null, args);
        };
        
        jcdu.utils.scope = jcdu.scope;
        /**
         * Extends obj with other objects in arguments
         * @memberof module:Utils
         * @function
         * @param {...object} obj
         * @returns {object}
         */
        CHIEF.utils.extend = function(obj) {
            obj = obj || {};
        
            for (var i = 1; i < arguments.length; i++) {
                if (!arguments[i])
                    continue;
        
                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key))
                        obj[key] = arguments[i][key];
                }
            }
        
            return obj;
        };
        /**
         * Returns function's arguments as array
         * @memberof module:Utils
         * @param {object} args Arguments
         * @returns {Array}
         */
        CHIEF.utils.argumentsToArray = function (args) {
            var a = [];
            for (var i = 0; i < args.length; i++) {
                a[i] = args[i];
            }
            return a;
        };
        /**
         * Inherits first object from second
         * @memberof module:Utils
         * @param {object} object
         * @param {object} parent
         */
        CHIEF.inherit = function (object, parent) {
            object.prototype = Object.create(parent.prototype);
        };
        
        CHIEF.utils.inherit = CHIEF.inherit;
        /**
         * Returns true if object is array, false otherwise
         * @memberof module:Utils
         * @param object
         * @returns {boolean}
         */
        CHIEF.utils.isArray = function (object) {
            if (Array.isArray === undefined) {
                return Object.prototype.toString.call(object) === '[object Array]';
            } else {
                return Array.isArray(object);
            }
        };
        /**
         * Returns date as string with specified format
         * @memberof module:Utils
         * @param {Object} date
         * @param {string} format d is for day, M is for month, Y is for full year
         */
        CHIEF.utils.getFormattedDate = function (date, format) {
            var day = date.getDate() + '';
            if (day < 10) {
                day = '0' + day;
            }
        
            var month = (date.getMonth() + 1) + '';
            if (month < 10) {
                month = '0' + month;
            }
        
            var year = date.getFullYear() + '';
        
            return format
                .replace('d', day)
                .replace('M', month)
                .replace('Y', year);
        };
        /**
         * Returns now date as string with specified format
         * @memberof module:Utils
         * @param {string} format d is for day, M is for month, Y is for full year
         */
        CHIEF.utils.now = function (format) {
            format = format || 'd-M-Y';
            var now = new Date();
            return CHIEF.utils.getFormattedDate(now, format);
        };
        /**
         * Compares two and more items
         * @memberof module:Utils
         * @param {...object} object objects to be compared
         * @returns {boolean}
         */
        CHIEF.utils.deepEqual = function () {
            var i, l, leftChain, rightChain;
        
            function compare2Objects (x, y) {
                var p;
        
                // remember that NaN === NaN returns false
                // and isNaN(undefined) returns true
                if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                    return true;
                }
        
                // Compare primitives and functions.
                // Check if both arguments link to the same object.
                // Especially useful on step when comparing prototypes
                if (x === y) {
                    return true;
                }
        
                // Works in case when functions are created in constructor.
                // Comparing dates is a common scenario. Another built-ins?
                // We can even handle functions passed across iframes
                if ((typeof x === 'function' && typeof y === 'function') ||
                    (x instanceof Date && y instanceof Date) ||
                    (x instanceof RegExp && y instanceof RegExp) ||
                    (x instanceof String && y instanceof String) ||
                    (x instanceof Number && y instanceof Number)) {
                    return x.toString() === y.toString();
                }
        
                // At last checking prototypes as good a we can
                if (!(x instanceof Object && y instanceof Object)) {
                    return false;
                }
        
                if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                    return false;
                }
        
                if (x.constructor !== y.constructor) {
                    return false;
                }
        
                if (x.prototype !== y.prototype) {
                    return false;
                }
        
                // Check for infinitive linking loops
                if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                    return false;
                }
        
                // Quick checking of one object beeing a subset of another.
                // todo: cache the structure of arguments[0] for performance
                for (p in y) {
                    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                        return false;
                    }
                    else if (typeof y[p] !== typeof x[p]) {
                        return false;
                    }
                }
        
                for (p in x) {
                    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                        return false;
                    }
                    else if (typeof y[p] !== typeof x[p]) {
                        return false;
                    }
        
                    switch (typeof (x[p])) {
                        case 'object':
                        case 'function':
        
                            leftChain.push(x);
                            rightChain.push(y);
        
                            if (!compare2Objects (x[p], y[p])) {
                                return false;
                            }
        
                            leftChain.pop();
                            rightChain.pop();
                            break;
        
                        default:
                            if (x[p] !== y[p]) {
                                return false;
                            }
                            break;
                    }
                }
        
                return true;
            }
        
            if (arguments.length < 2) {
                return true; //Die silently? Don't know how to handle such case, please help...
                // throw "Need two or more arguments to compare";
            }
        
            for (i = 1, l = arguments.length; i < l; i++) {
        
                leftChain = []; //Todo: this can be cached
                rightChain = [];
        
                if (!compare2Objects(arguments[0], arguments[i])) {
                    return false;
                }
            }
        
            return true;
        };
        /**
         * Queue for functions, each function in parameter gets input from the previous function output
         * Last parameter is an argument for first function
         * @returns {*}
         */
        CHIEF.queue = function () {
            var args = [].slice.call(arguments);
        
            var result = args[args.length - 1];
            args.pop();
        
            for (var i = 0; i < args.length; i++) {
                result = args[i](result);
            }
        
            return result;
        };
    
        CHIEF.u = CHIEF.utils;
    })();

    jcdu.scope(function () {
        /** @module Random */
    
        var _m = Math;
    
        jcdu.fn('random');
    
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
        CHIEF.random.number = function () {
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
        CHIEF.random.int = function () {
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
    
        /**
         * Returns a random boolean
         * @memberof module:Random
         * @returns {boolean}
         */
        CHIEF.random.bool = function () {
            return _m.floor(_m.random() * 2) > 0.5;
        };
    
        /**
         * Returns a random array
         * @memberof module:Random
         * @param {int} length Length of an array
         * @param {string} type Type of elements
         * @param {object} options Options
         * @returns {Array}
         */
        CHIEF.random.array = function (length, type, options) {
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
                    randomElement = CHIEF.random.number;
                    optName1 = 'min';
                    optName2 = 'max';
                    break;
                case 'int':
                    randomElement = CHIEF.random.int;
                    optName1 = 'min';
                    optName2 = 'max';
                    break;
                case 'string':
                    randomElement = CHIEF.random.string;
                    optName1 = 'length';
                    optName2 = null;
                    break;
                case 'boolean':
                    randomElement = CHIEF.random.boolean;
                    optName1 = null;
                    optName2 = null;
                    break;
                default:
                    randomElement = CHIEF.random.int;
            }
        
            for (var i = 0; i < length; i++) {
                array.push(randomElement(options[optName1], options[optName2]));
            }
        
            return array;
        };
    
        /**
         * Returns a random string
         * @memberof module:Random
         * @param {int} length Length of a string
         * @returns {string}
         */
        CHIEF.random.string = function (length) {
            length = length || 10;
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
        
            return text;
        };
    
        jcdu.r = jcdu.random;
    });

    CHIEF.scope(function () {
        /** @module BrowserFunctions */
        CHIEF.fn('browserFunctions');
    
        /**
         * Returns true if browser is Firefox, false otherwise
         * @memberof module:BrowserFunctions
         * @returns {boolean}
         */
        CHIEF.browserFunctions.isFirefox = function () {
            return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        };
        /**
         * Browser's name locates in this variable
         */
        CHIEF.browserFunctions.name = (function () {
            var ua = navigator.userAgent, tem,
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE ' + (tem[1] || '');
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
            return M.join(' ');
        })();
    
        CHIEF.bf = CHIEF.browserFunctions;
    });

    CHIEF.scope(function () {
        /** @module ArrayFunctions */
        CHIEF.fn('arrayFunctions');
    
        /**
         * Remove all occurrences of deleteValue if array
         * @memberof module:ArrayFunctions
         * @param {object} deleteValue Value to be deleted
         * @returns {Array}
         */
        Array.prototype.clean = function(deleteValue) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === deleteValue) {
                    this.splice(i, 1);
                    i--;
                }
            }
            return this;
        };
    
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
    
        /**
         * Moves array's element from old_index to new_index
         * @memberof module:ArrayFunctions
         * @param {number} old_index Old index
         * @param {number} new_index New index
         * @returns {Array}
         */
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
    
        /**
         * Returns true if array contains obj, false otherwise
         * @memberof module:ArrayFunctions
         * @param {object} obj Object to be checked
         * @returns {boolean}
         */
        Array.prototype.contains = function(obj) {
            // TODO add object {} support
            var i = this.length;
            while (i--) {
                if (this[i] === obj) {
                    return true;
                }
            }
            return false;
        };
    
        /**
         * Returns true if array contains object with specified id, false otherwise
         * @memberof module:ArrayFunctions
         * @deprecated
         * @param {number} id Object's ID
         * @returns {boolean}
         */
        Array.prototype.containsObjectById = function (id) {
            for (var i = 0; i < this.length; i++) {
                if (this[i].id === id) {
                    return true;
                }
            }
            return false;
        };
    
        CHIEF.af = CHIEF.arrayFunctions;
    });

    jcdu.scope(function () {
        /** @module StringFunctions */
        CHIEF.fn('stringFunctions');
    
        /**
         * Truncates string and replaces last three characters with '...', if string length is more than maxlength
         * @memberof module:StringFunctions
         * @param {string} str
         * @param {number} maxlength
         * @returns {string}
         */
        CHIEF.stringFunctions.truncate = function (str, maxlength) {
            if (!str) {
                return '';
            }
            if (!maxlength) {
                maxlength = 20;
            }
            return (str.length > maxlength) ? str.slice(0, maxlength - 3) + '...' : str;
        };
    
        CHIEF.sf = CHIEF.stringFunctions;
    });

    CHIEF.scope(function () {
        /** @module NumberFunctions */
        CHIEF.fn('numberFunctions');
    
        /**
         * Returns true if n is numeric, false otherwise
         * @memberof module:NumberFunctions
         * @param {object} n
         * @returns {boolean}
         */
        CHIEF.numberFunctions.isNumeric = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
    
        /**
         * Returns random float from specified range from min to max
         * @memberof module:NumberFunctions
         * @deprecated
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        CHIEF.numberFunctions.getRandomNumber = function (min, max) {
            return CHIEF.random.number(min, max);
        };
    
        /**
         * Return random int from specified range from min to max (both inclusive)
         * @memberof module:NumberFunctions
         * @deprecated
         * @param {number} min
         * @param {number} max
         * @returns {*}
         */
        CHIEF.numberFunctions.getRandomInt = function (min, max) {
            return CHIEF.random.int(min, max);
        };
    
        CHIEF.nf = CHIEF.numberFunctions;
    });

    CHIEF.scope(function () {
        /** @module Objects */
        CHIEF.fn('o');
    
        /**
         * Abstract is nothing!
         * @memberof module:Objects
         * @constructor
         */
        CHIEF.o.Abstract = function () {};
        
        /**
         * Returns class name 'CHIEF.o.Abstract'
         * @returns {string}
         */
        CHIEF.o.Abstract.prototype.getClass = function () {
            return 'o.Abstract';
        };
        
        /**
         * Does nothing, returns null
         * @returns {null}
         */
        CHIEF.o.Abstract.prototype.method = function () {
            return null;
        };
        
        CHIEF.o.Abstract.method = function () {
            return null;
        };
    
        /**
         *
         * @memberof module:Objects
         * @class
         * @extends {Error}
         * @param {string} message Error message
         * @constructor
         */
        CHIEF.o.NoSuchElementException = function(message) {
            this.message = message || '';
        };
        CHIEF.inherit(CHIEF.o.NoSuchElementException, Error);
        
        CHIEF.o.NoSuchElementException.prototype.name = 'NoSuchElementException';
        /**
         *
         * @memberof module:Objects
         * @class
         * @extends {Error}
         * @param message
         * @constructor
         */
        CHIEF.o.OperationNotSupported = function(message) {
            this.message = message || '';
        };
        CHIEF.inherit(CHIEF.o.OperationNotSupported, Error);
        
        CHIEF.o.OperationNotSupported.prototype.name = 'OperationNotSupported';
    
        (function () {
            /**
             *
             * @memberof module:Objects
             * @class
             * @extends {CHIEF.o.Abstract}
             * @constructor
             */
            CHIEF.o.Collection = function () {
                /**
                 *
                 * @type {Array}
                 * @private
                 */
                this.array_ = [];
        
                if (arguments[0] instanceof Collection) {
                    this.addAll(arguments[0]);
                }
        
                if (CHIEF.utils.isArray(arguments[0])) {
                    for (var i = 0; i < arguments[0].length; i++) {
                        this.add(arguments[0][i]);
                    }
                }
            };
        
            CHIEF.inherit(CHIEF.o.Collection, CHIEF.o.Abstract);
        
            /**
             *
             * @override
             * @returns {string}
             */
            CHIEF.o.Collection.prototype.getClass = function () {
                return 'o.Collection';
            };
        
            /**
             *
             * @type {*|string}
             */
            CHIEF.o.Collection.prototype.contains = CHIEF.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            CHIEF.o.Collection.prototype.add = CHIEF.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            CHIEF.o.Collection.prototype.addAll = CHIEF.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            CHIEF.o.Collection.prototype.isEmpty = CHIEF.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            CHIEF.o.Collection.prototype.iterator = CHIEF.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            CHIEF.o.Collection.prototype.size = CHIEF.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            CHIEF.o.Collection.prototype.toArray = CHIEF.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            CHIEF.o.Collection.prototype.remove = CHIEF.o.Abstract.method;
        })();
        /**
         *
         * @memberof module:Objects
         * @class
         * @extends {CHIEF.o.Abstract}
         * @constructor
         */
        CHIEF.o.Iterator = function () {};
        
        CHIEF.inherit(CHIEF.o.Iterator, CHIEF.o.Abstract);
        
        CHIEF.o.Iterator.prototype.getClass = function () {
            return 'o.Iterator';
        };
        
        /**
         *
         * @type {*|string}
         */
        CHIEF.o.Iterator.prototype.hasNext = CHIEF.o.Abstract.method;
        
        /**
         *
         * @type {*|string}
         */
        CHIEF.o.Iterator.prototype.next = CHIEF.o.Abstract.method;
        
        /**
         *
         * @type {*|string}
         */
        CHIEF.o.Iterator.prototype.remove = CHIEF.o.Abstract.method;
    
        (function () {
            /**
             *
             * @memberof module:Objects
             * @class
             * @extends {CHIEF.o.Collection}
             * @constructor
             */
            CHIEF.o.Set = function () {
                this.set_ = [];
            };
        
            CHIEF.inherit(CHIEF.o.Set, CHIEF.o.Collection);
        
            /**
             *
             * @override
             * @returns {string}
             */
            CHIEF.o.Set.prototype.getClass = function () {
                return 'o.Set';
            };
        
            /**
             *
             * @override
             * @param o
             * @returns {boolean}
             */
            CHIEF.o.Set.prototype.contains = function (o) {
                return this.set_.indexOf(o) !== -1;
            };
        
            /**
             *
             * @override
             * @type {boolean}
             */
            CHIEF.o.Set.prototype.add = function (e) {
                if (!this.contains(e)) {
                    this.set_.push(e);
                    return true;
                } else {
                    return false;
                }
            };
        
            /**
             *
             * @override
             * @param c iterator
             * @type {boolean}
             */
            CHIEF.o.Set.prototype.addAll = function (c) {
                for (var i = c.iterator(); i.hasNext();) {
                    this.add(i.next());
                }
                return true;
            };
        
            /**
             *
             * @override
             * @param e
             */
            CHIEF.o.Set.prototype.remove = function (e) {
                var index = this.set_.indexOf(e);
                if (index !== -1) {
                    this.set_.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
            };
        
            /**
             *
             * @override
             * @returns {Number}
             */
            CHIEF.o.Set.prototype.size = function () {
                return this.set_.length;
            };
        
            /**
             *
             * @override
             * @returns {boolean}
             */
            CHIEF.o.Set.prototype.isEmpty = function () {
                return this.set_.length === 0;
            };
        
            /**
             *
             * @type {Array}
             */
            CHIEF.o.Set.prototype.toArray = function () {
                return [].concat(this.set_);
            };
        
            /**
             *
             * @override
             * @returns {Iterator_}
             */
            CHIEF.o.Set.prototype.iterator = function () {
                return new Iterator_(this);
            };
        
            var Iterator_ = function (set_) {
                this.set_ = set_;
                this.position_ = 0;
            };
        
            Iterator_.prototype.next = function () {
                if (this.position_ === this.set_.size()) {
                    throw new CHIEF.o.NoSuchElementException();
                }
                return this.set_.set_[this.position_++];
            };
        
            Iterator_.prototype.hasNext = function () {
                return this.position_ < this.set_.size();
            };
        
            Iterator_.prototype.remove = function () {
                // TODO
                throw new CHIEF.o.OperationNotSupported();
            };
        })();
        /**
         *
         * @memberof module:Objects
         * @class
         * @extends {CHIEF.o.Set}
         * @constructor
         */
        CHIEF.o.SortedSet = function() {};
        CHIEF.inherit(CHIEF.o.SortedSet, CHIEF.o.Set);
        
        /**
         *
         * @override
         * @returns {string}
         */
        CHIEF.o.SortedSet.prototype.getClass = function () {
            return 'o.SortedSet';
        };
        (function () {
            var Collection = CHIEF.o.Collection;
        
            /**
             *
             * @memberof module:Objects
             * @class CHIEF.o.TreeSet
             * @extends {CHIEF.o.SortedSet}
             * @constructor
             */
            CHIEF.o.TreeSet = function () {
                /**
                 *
                 * @type {Array}
                 * @private
                 */
                this.array_ = [];
        
                if (arguments[0] instanceof Collection) {
                    this.addAll(arguments[0]);
                }
        
                if (CHIEF.utils.isArray(arguments[0])) {
                    for (var i = 0; i < arguments[0].length; i++) {
                        this.add(arguments[0][i]);
                    }
                }
            };
        
            CHIEF.inherit(CHIEF.o.TreeSet, CHIEF.o.SortedSet);
        
            /**
             * Returns class name 'CHIEF.o.TreeSet'
             * @memberof module:Objects
             * @override
             * @returns {string}
             */
            CHIEF.o.TreeSet.prototype.getClass = function () {
                return 'o.TreeSet';
            };
        
            /**
             *
             * @override
             * @param o
             * @returns {boolean}
             */
            CHIEF.o.TreeSet.prototype.contains = function (o) {
                for (var i = 0, len = this.array_.length; i < len; i++) {
                    var e = this.array_[i];
                    if (e === o) {
                        return true;
                    }
                }
                return false;
            };
        
            /**
             *
             * @override
             * @param o
             * @returns {boolean}
             */
            CHIEF.o.TreeSet.prototype.add = function (o) {
                if (this.contains(o)) {
                    return false;
                }
        
                for (var i = 0, len = this.array_.length; i < len; i++) {
                    var e = this.array_[i];
                    if (e > o) {
                        this.array_.splice(i, 0, o);
                        return true;
                    }
                }
        
                this.array_.push(o);
        
                return true;
            };
        
            /**
             *
             * @override
             * @param c
             * @returns {boolean}
             */
            CHIEF.o.TreeSet.prototype.addAll = function (c) {
                for (var i = c.iterator(); i.hasNext();) {
                    this.add(i.next());
                }
                return true;
            };
        
            /**
             *
             * @override
             * @param e
             */
            CHIEF.o.TreeSet.prototype.remove = function (e) {
                var index = this.array_.indexOf(e);
                if (index !== -1) {
                    this.array_.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
            };
        
            /**
             *
             * @override
             * @returns {Number}
             */
            CHIEF.o.TreeSet.prototype.size = function () {
                return this.array_.length;
            };
        
            /**
             *
             * @override
             * @returns {boolean}
             */
            CHIEF.o.TreeSet.prototype.isEmpty = function () {
                return this.array_.length === 0;
            };
        
            /**
             *
             * @override
             * @returns {Array}
             */
            CHIEF.o.TreeSet.prototype.toArray = function () {
                var array = [];
        
                for (var i = 0, len = this.array_.length; i < len; i++) {
                    array.push(this.array_[i]);
                }
        
                return array;
            };
        
            /**
             *
             * @override
             * @returns {Iterator_}
             */
            CHIEF.o.TreeSet.prototype.iterator = function () {
                return new Iterator_(this);
            };
        
            var Iterator_ = function (treeSet) {
                this.treeSet_ = treeSet;
                this.position_ = 0;
            };
        
            Iterator_.prototype.next = function () {
                if (this.position_ === this.treeSet_.size()) {
                    throw new CHIEF.o.NoSuchElementException();
                }
                return this.treeSet_.array_[this.position_++];
            };
        
            Iterator_.prototype.hasNext = function () {
                return this.position_ < this.treeSet_.size();
            };
        
            Iterator_.prototype.remove = function () {
                // TODO
                throw new CHIEF.o.OperationNotSupported();
            };
        })();
    
        /**
         *
         * @memberof module:Objects
         * @class
         * @extends {CHIEF.o.Collection}
         * @constructor
         */
        CHIEF.o.List = function() {};
        CHIEF.inherit(CHIEF.o.List, CHIEF.o.Collection);
        
        /**
         *
         * @type {*|string}
         */
        CHIEF.o.List.prototype.get = CHIEF.o.Abstract.method;
        
        /**
         *
         * @type {*|string}
         */
        CHIEF.o.List.prototype.set = CHIEF.o.Abstract.method;
        
        /**
         *
         * @type {*|string}
         */
        CHIEF.o.List.prototype.isEmpty = CHIEF.o.Abstract.method;
        (function () {
            var Collection = CHIEF.o.Collection;
            var IndexOutOfBoundsException = CHIEF.o.IndexOutOfBoundsException;
            var NoSuchElementException = CHIEF.o.NoSuchElementException;
            var OperationNotSupported = CHIEF.o.OperationNotSupported;
        
            /**
             *
             * @memberof module:Objects
             * @class
             * @extends {CHIEF.o.List}
             * @constructor
             */
            CHIEF.o.ArrayList = function () {
                this.array_ = [];
                this.type_ = '';
        
                if (arguments[0] instanceof Collection) {
                    this.addAll(arguments[0]);
                }
        
                if (typeof arguments[0] === 'string' && ['string', 'number', 'object'].indexOf(arguments[0]) > -1) {
                    this.type_ = arguments[0];
                }
            };
            CHIEF.inherit(CHIEF.o.ArrayList, CHIEF.o.List);
        
            /**
             *
             * @override
             * @returns {string}
             */
            CHIEF.o.ArrayList.prototype.getClass = function () {
                return 'o.ArrayList';
            };
        
            /**
             *
             * @returns {string|*}
             */
            CHIEF.o.ArrayList.prototype.getType = function () {
                return this.type_;
            };
        
            /**
             *
             * @override
             * @param e
             * @returns {boolean}
             */
            CHIEF.o.ArrayList.prototype.add = function (e) {
                if (this.getType() !== '') {
                    if (typeof e === this.getType()) {
                        this.array_.push(e);
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    this.array_.push(e);
                    return true;
                }
            };
        
            /**
             *
             * @override
             * @param c
             * @returns {boolean}
             */
            CHIEF.o.ArrayList.prototype.addAll = function (c) {
                for (var i = c.iterator(); i.hasNext();) {
                    this.add(i.next());
                }
                return true;
            };
        
            /**
             *
             * @override
             * @param index
             * @param element
             * @returns {*}
             */
            CHIEF.o.ArrayList.prototype.set = function (index, element) {
                var oldElement = this.array_[index];
                this.array_[index] = element;
                return oldElement;
            };
        
            /**
             *
             * @override
             * @returns {Iterator_}
             */
            CHIEF.o.ArrayList.prototype.iterator = function () {
                return new Iterator_(this);
            };
        
            /**
             *
             * @override
             * @param index
             * @returns {*}
             */
            CHIEF.o.ArrayList.prototype.get = function (index) {
                if (index < 0 || index >= this.size()) {
                    throw new IndexOutOfBoundsException();
                }
        
                return this.array_[index];
            };
        
            /**
             *
             * @override
             * @returns {boolean}
             */
            CHIEF.o.ArrayList.prototype.isEmpty = function () {
                return this.array_.length === 0;
            };
        
            /**
             *
             * @override
             * @returns {Number}
             */
            CHIEF.o.ArrayList.prototype.size = function () {
                return this.array_.length;
            };
        
            /**
             *
             * @override
             * @returns {Array}
             */
            CHIEF.o.ArrayList.prototype.toArray = function () {
                var array = [];
        
                for (var i = 0, len = this.array_.length; i < len; i++) {
                    array.push(this.array_[i]);
                }
        
                return array;
            };
        
            /**
             *
             * @override
             * @param o
             * @returns {boolean}
             */
            CHIEF.o.ArrayList.prototype.remove = function (o) {
                var found = false;
        
                for (var i = 0, len = this.array_.length; i < len; i++) {
                    if (this.array_[i] === o) {
                        this.array_.splice(i, 1);
                        found = true;
                        break;
                    }
                }
        
                return found;
            };
        
            var Iterator_ = function (arrayList) {
                this.arrayList_ = arrayList;
                this.position_ = 0;
            };
        
            Iterator_.prototype.next = function () {
                if (this.position_ === this.arrayList_.size()) {
                    throw new NoSuchElementException();
                }
                return this.arrayList_.get(this.position_++);
            };
        
            Iterator_.prototype.hasNext = function () {
                return this.position_ < this.arrayList_.size();
            };
        
            Iterator_.prototype.remove = function () {
                // TODO
                throw new OperationNotSupported();
            };
        })();
        (function () {
            var Collection = CHIEF.o.Collection;
            var IndexOutOfBoundsException = CHIEF.o.IndexOutOfBoundsException;
            var NoSuchElementException = CHIEF.o.NoSuchElementException;
            var OperationNotSupported = CHIEF.o.OperationNotSupported;
        
            /**
             *
             * @memberof module:Objects
             * @class
             * @extends {CHIEF.o.List}
             * @constructor
             */
            CHIEF.o.LinkedList = function () {
                this.s_ = null;
                this.e_ = null;
        
                if (arguments[0] instanceof Collection) {
                    this.addAll(arguments[0]);
                }
            };
            CHIEF.inherit(CHIEF.o.LinkedList, CHIEF.o.List);
        
            /**
             *
             * @override
             * @returns {string}
             */
            CHIEF.o.LinkedList.prototype.getClass = function () {
                return 'o.LinkedList';
            };
        
            /**
             *
             * @returns {{d: null, n: null}}
             */
            CHIEF.o.LinkedList.prototype.makeNode = function () {
                return {
                    d: null, // d is for 'data'
                    n: null  // n is for 'next'
                }
            };
        
            /**
             *
             * @param e
             */
            CHIEF.o.LinkedList.prototype.add = function (e) {
                if (this.s_ === null) {
                    this.s_ = this.makeNode();
                    this.e_ = this.s_;
                } else {
                    this.e_.n = this.makeNode();
                    this.e_ = this.e_.n;
                }
                this.e_.d = e;
            };
        
            /**
             *
             * @param c
             * @returns {boolean}
             */
            CHIEF.o.LinkedList.prototype.addAll = function (c) {
                throw new OperationNotSupported();
                for (var i = c.iterator(); i.hasNext();) {
                    this.add(i.next());
                }
                return true;
            };
        
            CHIEF.o.LinkedList.prototype.set = function (index, element) {
                throw new OperationNotSupported();
            };
        
            /**
             *
             * @returns {Iterator_}
             */
            CHIEF.o.LinkedList.prototype.iterator = function () {
                return new Iterator_(this);
            };
        
            /**
             *
             * @throws {CHIEF.o.NoSuchElementException}
             * @param index
             * @returns {*}
             */
            CHIEF.o.LinkedList.prototype.get = function (index) {
                var current = this.s_;
                var currentIndex = 0;
                while (current !== null) {
                    if (currentIndex === index) {
                        return current.d;
                    } else {
                        current = current.n;
                        currentIndex++;
                    }
                }
                throw NoSuchElementException();
            };
        
            CHIEF.o.LinkedList.prototype.getRoot = function () {
                throw new OperationNotSupported();
                return this.array_[this.root_];
            };
        
            CHIEF.o.LinkedList.prototype.isEmpty = function () {
                throw new OperationNotSupported();
                return Object.keys(this.array_).length === 0;
            };
        
            CHIEF.o.LinkedList.prototype.size = function () {
                var current = this.s_;
                var size = 0;
                while (current !== null) {
                    size++;
                    current = current.n;
                }
                return size;
            };
        
            CHIEF.o.LinkedList.prototype.toArray = function () {
                var iterator = this.iterator();
                var array = [];
                while (iterator.hasNext()) {
                    array.push(iterator.getValue());
                    iterator.next();
                }
                return array;
            };
        
            CHIEF.o.LinkedList.prototype.remove = function (o) {
                var current = this.s_;
                var prev = this.s_;
                while (current !== null) {
                    if (o === current.d) {
                        if (current === this.s_) {
                            this.s_ = current.n;
                            return true;
                        }
                        if (current === this.e_) {
                            this.e_ = prev;
                            prev.n = current.n;
                            return true;
                        }
                    }
                    prev = current;
                    current = current.n;
                }
                return false;
            };
        
            /**
             *
             * @param linkedList
             * @constructor
             * @private
             */
            var Iterator_ = function (linkedList) {
                this.e_ = linkedList.s_;
            };
        
            Iterator_.prototype.next = function () {
                var next = this.e_.n;
                this.e_ = this.e_.n;
                return next;
            };
        
            Iterator_.prototype.hasNext = function () {
                return this.e_.n !== null;
            };
        
            /**
             *
             * @returns {*}
             */
            Iterator_.prototype.getValue = function () {
                return this.e_.d;
            };
        
            Iterator_.prototype.remove = function () {
                // TODO
                throw new OperationNotSupported();
            };
        })();
    
        // disabled
        // = Random/Random.js
    });
})(window);