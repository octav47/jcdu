/**
 * @namespace jcdu
 */
(/** @lends jcdu */ function (window, undefined) {
    var jcdu = {};

    if (!window.jcdu) {
        window.jcdu = jcdu;
    }

    (function () {
        /** @module Utils */
        jcdu.utils = {};
    
        /**
         * Extends jcdu object
         * @memberof module:Utils
         * @param {string} propertyName
         */
        jcdu.fn = function (propertyName) {
            this[propertyName] = {};
        };
        /**
         * Extends obj with other objects in arguments
         * @memberof module:Utils
         * @function
         * @param {...object} obj
         * @returns {object}
         */
        jcdu.utils.extend = function(obj) {
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
         * @returns {Array}
         */
        jcdu.utils.argumentsToArray = function () {
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }
            return args;
        };
        /**
         * Inherits first object from second
         * @memberof module:Utils
         * @param {object} object
         * @param {object} parent
         */
        jcdu.inherit = function (object, parent) {
            object.prototype = Object.create(parent.prototype);
        };
        
        jcdu.utils.inherit = jcdu.inherit;
        /**
         * Returns true if object is array, false otherwise
         * @memberof module:Utils
         * @param object
         * @returns {boolean}
         */
        jcdu.utils.isArray = function (object) {
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
        jcdu.utils.getFormattedDate = function (date, format) {
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
        jcdu.utils.now = function (format) {
            var now = new Date();
            return jcdu.utils.getFormattedDate(now, format);
        };
        /**
         * Compares two and more items
         * @memberof module:Utils
         * @param {...object} object objects to be compared
         * @returns {boolean}
         */
        jcdu.utils.deepEqual = function () {
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
    })();

    (function () {
        /** @module BrowserFunctions */
        jcdu.fn('browserFunctions');
    
        /**
         * Returns true if browser is Firefox, false otherwise
         * @memberof module:BrowserFunctions
         * @returns {boolean}
         */
        jcdu.browserFunctions.isFirefox = function () {
            return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        };
    })();

    (function () {
        /** @module ArrayFunctions */
        jcdu.fn('arrayFunctions');
    
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
    })();

    (function () {
        /** @module StringFunctions */
        jcdu.fn('stringFunctions');
    
        /**
         * Truncates string and replaces last three characters with '...', if string length is more than maxlength
         * @memberof module:StringFunctions
         * @param {string} str
         * @param {number} maxlength
         * @returns {string}
         */
        jcdu.stringFunctions.truncate = function (str, maxlength) {
            if (!str) {
                return '';
            }
            if (!maxlength) {
                maxlength = 20;
            }
            return (str.length > maxlength) ? str.slice(0, maxlength - 3) + '...' : str;
        };
    })();

    (function () {
        /** @module NumberFunctions */
        jcdu.fn('numberFunctions');
    
        /**
         * Returns true if n is numeric, false otherwise
         * @memberof module:NumberFunctions
         * @param {object} n
         * @returns {boolean}
         */
        jcdu.numberFunctions.isNumeric = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        /**
         * Returns random float from specified range from min to max
         * @memberof module:NumberFunctions
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        jcdu.numberFunctions.getRandomNumber = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        /**
         * Return random int from specified range from min to max (both inclusive)
         * @memberof module:NumberFunctions
         * @param {number} min
         * @param {number} max
         * @returns {*}
         */
        jcdu.numberFunctions.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
    })();

    (function () {
        /** @module Objects */
        jcdu.fn('o');
    
        /**
         * Abstract is nothing!
         * @memberof module:Objects
         * @constructor
         */
        jcdu.o.Abstract = function () {
            /**
             * Returns class name 'jcdu.o.Abstract'
             * @returns {string}
             */
            this.getClass = function () {
                return 'jcdu.o.Abstract';
            };
        
            /**
             * Does nothing, returns null
             * @returns {null}
             */
            this.method = function () {
                return null;
            };
        };
    
        /**
         *
         * @memberof module:Objects
         * @class
         * @extends {Error}
         * @param {string} message Error message
         * @constructor
         */
        jcdu.o.NoSuchElementException = function(message) {
            this.message = message || '';
        };
        jcdu.inherit(jcdu.o.NoSuchElementException, Error);
        
        jcdu.o.NoSuchElementException.prototype.name = 'NoSuchElementException';
        /**
         *
         * @memberof module:Objects
         * @class
         * @extends {Error}
         * @param message
         * @constructor
         */
        jcdu.o.OperationNotSupported = function(message) {
            this.message = message || '';
        };
        jcdu.inherit(jcdu.o.OperationNotSupported, Error);
        
        jcdu.o.OperationNotSupported.prototype.name = 'OperationNotSupported';
    
        (function () {
            var Collection = jcdu.o.Collection;
            /**
             *
             * @memberof module:Objects
             * @class
             * @extends {jcdu.o.Abstract}
             * @constructor
             */
            jcdu.o.Collection = function () {
                /**
                 *
                 * @type {Array}
                 * @private
                 */
                this.array_ = [];
        
                if (arguments[0] instanceof Collection) {
                    this.addAll(arguments[0]);
                }
        
                if (jcdu.utils.isArray(arguments[0])) {
                    for (var i = 0; i < arguments[0].length; i++) {
                        this.add(arguments[0][i]);
                    }
                }
            };
        
            jcdu.inherit(jcdu.o.Collection, jcdu.o.Abstract);
        
            /**
             *
             * @override
             * @returns {string}
             */
            jcdu.o.Collection.prototype.getClass = function () {
                return 'jcdu.o.Collection';
            };
        
            /**
             *
             * @type {*|string}
             */
            jcdu.o.Collection.prototype.contains = jcdu.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            jcdu.o.Collection.prototype.add = jcdu.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            jcdu.o.Collection.prototype.addAll = jcdu.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            jcdu.o.Collection.prototype.isEmpty = jcdu.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            jcdu.o.Collection.prototype.iterator = jcdu.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            jcdu.o.Collection.prototype.size = jcdu.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            jcdu.o.Collection.prototype.toArray = jcdu.o.Abstract.method;
        
            /**
             *
             * @type {*|string}
             */
            jcdu.o.Collection.prototype.remove = jcdu.o.Abstract.method;
        })();
        /**
         *
         * @memberof module:Objects
         * @class
         * @extends {jcdu.o.Abstract}
         * @constructor
         */
        jcdu.o.Iterator = function () {};
        
        jcdu.inherit(jcdu.o.Iterator, jcdu.o.Abstract);
        
        jcdu.o.Iterator.prototype.getClass = function () {
            return 'jcdu.o.Iterator';
        };
        
        /**
         *
         * @type {*|string}
         */
        jcdu.o.Iterator.prototype.hasNext = jcdu.o.Abstract.method;
        
        /**
         *
         * @type {*|string}
         */
        jcdu.o.Iterator.prototype.next = jcdu.o.Abstract.method;
        
        /**
         *
         * @type {*|string}
         */
        jcdu.o.Iterator.prototype.remove = jcdu.o.Abstract.method;
    
        (function () {
            /**
             *
             * @memberof module:Objects
             * @class
             * @extends {jcdu.o.Collection}
             * @constructor
             */
            jcdu.o.Set = function () {
                this.set_ = [];
            };
        
            jcdu.inherit(jcdu.o.Set, jcdu.o.Collection);
        
            /**
             *
             * @override
             * @returns {string}
             */
            jcdu.o.Set.prototype.getClass = function () {
                return 'jcdu.o.Set';
            };
        
            /**
             *
             * @override
             * @param o
             * @returns {boolean}
             */
            jcdu.o.Set.prototype.contains = function (o) {
                return this.set_.indexOf(o) !== -1;
            };
        
            /**
             *
             * @override
             * @type {boolean}
             */
            jcdu.o.Set.prototype.add = function (e) {
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
             * @type {boolean}
             */
            jcdu.o.Set.prototype.addAll = function (c) {
                for (var i = c.iterator(); i.hasNext();) {
                    this.add(i.next());
                }
                return true;
            };
        
            /**
             *
             * @type {Array}
             */
            jcdu.o.Set.prototype.toArray = function () {
                return this.set_;
            };
        })();
        /**
         *
         * @memberof module:Objects
         * @class
         * @extends {jcdu.o.Set}
         * @constructor
         */
        jcdu.o.SortedSet = function() {};
        jcdu.inherit(jcdu.o.SortedSet, jcdu.o.Set);
        
        /**
         *
         * @override
         * @returns {string}
         */
        jcdu.o.SortedSet.prototype.getClass = function () {
            return 'jcdu.o.SortedSet';
        };
        (function () {
            var Collection = jcdu.o.Collection;
        
            /**
             *
             * @memberof module:Objects
             * @class jcdu.o.TreeSet
             * @extends {jcdu.o.SortedSet}
             * @constructor
             */
            jcdu.o.TreeSet = function () {
                /**
                 *
                 * @type {Array}
                 * @private
                 */
                this.array_ = [];
        
                if (arguments[0] instanceof Collection) {
                    this.addAll(arguments[0]);
                }
        
                if (jcdu.utils.isArray(arguments[0])) {
                    for (var i = 0; i < arguments[0].length; i++) {
                        this.add(arguments[0][i]);
                    }
                }
            };
        
            jcdu.inherit(jcdu.o.TreeSet, jcdu.o.SortedSet);
        
            /**
             * Returns class name 'jcdu.o.TreeSet'
             * @memberof module:Objects
             * @override
             * @returns {string}
             */
            jcdu.o.TreeSet.prototype.getClass = function () {
                return 'jcdu.o.TreeSet';
            };
        
            /**
             *
             * @override
             * @param o
             * @returns {boolean}
             */
            jcdu.o.TreeSet.prototype.contains = function (o) {
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
            jcdu.o.TreeSet.prototype.add = function (o) {
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
            jcdu.o.TreeSet.prototype.addAll = function (c) {
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
            jcdu.o.TreeSet.prototype.remove = function (e) {
                // TODO
                throw new jcdu.o.OperationNotSupported();
            };
        
            /**
             *
             * @override
             * @returns {Number}
             */
            jcdu.o.TreeSet.prototype.size = function () {
                return this.array_.length;
            };
        
            /**
             *
             * @override
             * @returns {boolean}
             */
            jcdu.o.TreeSet.prototype.isEmpty = function () {
                return this.array_.length === 0;
            };
        
            /**
             *
             * @override
             * @returns {Array}
             */
            jcdu.o.TreeSet.prototype.toArray = function () {
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
            jcdu.o.TreeSet.prototype.iterator = function () {
                return new Iterator_(this);
            };
        
            var Iterator_ = function (treeSet) {
                this.treeSet_ = treeSet;
                this.position_ = 0;
            };
        
            Iterator_.prototype.next = function () {
                if (this.position_ === this.treeSet_.size()) {
                    throw new jcdu.o.NoSuchElementException();
                }
                return this.treeSet_.array_[this.position_++];
            };
        
            Iterator_.prototype.hasNext = function () {
                return this.position_ < this.treeSet_.size();
            };
        
            Iterator_.prototype.remove = function () {
                // TODO
                throw new jcdu.o.OperationNotSupported();
            };
        })();
    
        /**
         *
         * @memberof module:Objects
         * @class
         * @extends {jcdu.o.Collection}
         * @constructor
         */
        jcdu.o.List = function() {};
        jcdu.inherit(jcdu.o.List, jcdu.o.Collection);
        
        /**
         *
         * @type {*|string}
         */
        jcdu.o.List.prototype.get = jcdu.o.Abstract.method;
        
        /**
         *
         * @type {*|string}
         */
        jcdu.o.List.prototype.set = jcdu.o.Abstract.method;
        
        /**
         *
         * @type {*|string}
         */
        jcdu.o.List.prototype.isEmpty = jcdu.o.Abstract.method;
        (function () {
            var Collection = jcdu.o.Collection;
            var IndexOutOfBoundsException = jcdu.o.IndexOutOfBoundsException;
            var NoSuchElementException = jcdu.o.NoSuchElementException;
            var OperationNotSupported = jcdu.o.OperationNotSupported;
        
            /**
             *
             * @memberof module:Objects
             * @class
             * @extends {jcdu.o.List}
             * @constructor
             */
            jcdu.o.ArrayList = function () {
                this.array_ = [];
                this.type_ = '';
        
                if (arguments[0] instanceof Collection) {
                    this.addAll(arguments[0]);
                }
        
                if (typeof arguments[0] === 'string' && ['string', 'number', 'object'].indexOf(arguments[0]) > -1) {
                    this.type_ = arguments[0];
                }
            };
            jcdu.inherit(jcdu.o.ArrayList, jcdu.o.List);
        
            /**
             *
             * @override
             * @returns {string}
             */
            jcdu.o.ArrayList.prototype.getClass = function () {
                return 'jcdu.o.ArrayList';
            };
        
            /**
             *
             * @returns {string|*}
             */
            jcdu.o.ArrayList.prototype.getType = function () {
                return this.type_;
            };
        
            /**
             *
             * @override
             * @param e
             * @returns {boolean}
             */
            jcdu.o.ArrayList.prototype.add = function (e) {
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
            jcdu.o.ArrayList.prototype.addAll = function (c) {
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
            jcdu.o.ArrayList.prototype.set = function (index, element) {
                var oldElement = this.array_[index];
                this.array_[index] = element;
                return oldElement;
            };
        
            /**
             *
             * @override
             * @returns {Iterator_}
             */
            jcdu.o.ArrayList.prototype.iterator = function () {
                return new Iterator_(this);
            };
        
            /**
             *
             * @override
             * @param index
             * @returns {*}
             */
            jcdu.o.ArrayList.prototype.get = function (index) {
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
            jcdu.o.ArrayList.prototype.isEmpty = function () {
                return this.array_.length === 0;
            };
        
            /**
             *
             * @override
             * @returns {Number}
             */
            jcdu.o.ArrayList.prototype.size = function () {
                return this.array_.length;
            };
        
            /**
             *
             * @override
             * @returns {Array}
             */
            jcdu.o.ArrayList.prototype.toArray = function () {
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
            jcdu.o.ArrayList.prototype.remove = function (o) {
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
            var Collection = jcdu.o.Collection;
            var IndexOutOfBoundsException = jcdu.o.IndexOutOfBoundsException;
            var NoSuchElementException = jcdu.o.NoSuchElementException;
            var OperationNotSupported = jcdu.o.OperationNotSupported;
        
            /**
             *
             * @memberof module:Objects
             * @class
             * @extends {jcdu.o.List}
             * @constructor
             */
            jcdu.o.LinkedList = function () {
                this.s_ = null;
                this.e_ = null;
        
                if (arguments[0] instanceof Collection) {
                    this.addAll(arguments[0]);
                }
            };
            jcdu.inherit(jcdu.o.LinkedList, jcdu.o.List);
        
            /**
             *
             * @override
             * @returns {string}
             */
            jcdu.o.LinkedList.prototype.getClass = function () {
                return 'jcdu.o.LinkedList';
            };
        
            /**
             *
             * @returns {{d: null, n: null}}
             */
            jcdu.o.LinkedList.prototype.makeNode = function () {
                return {
                    d: null, // d is for 'data'
                    n: null  // n is for 'next'
                }
            };
        
            /**
             *
             * @param e
             */
            jcdu.o.LinkedList.prototype.add = function (e) {
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
            jcdu.o.LinkedList.prototype.addAll = function (c) {
                throw new OperationNotSupported();
                for (var i = c.iterator(); i.hasNext();) {
                    this.add(i.next());
                }
                return true;
            };
        
            jcdu.o.LinkedList.prototype.set = function (index, element) {
                throw new OperationNotSupported();
            };
        
            /**
             *
             * @returns {Iterator_}
             */
            jcdu.o.LinkedList.prototype.iterator = function () {
                return new Iterator_(this);
            };
        
            /**
             *
             * @throws {jcdu.o.NoSuchElementException}
             * @param index
             * @returns {*}
             */
            jcdu.o.LinkedList.prototype.get = function (index) {
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
        
            jcdu.o.LinkedList.prototype.getRoot = function () {
                throw new OperationNotSupported();
                return this.array_[this.root_];
            };
        
            jcdu.o.LinkedList.prototype.isEmpty = function () {
                throw new OperationNotSupported();
                return Object.keys(this.array_).length === 0;
            };
        
            jcdu.o.LinkedList.prototype.size = function () {
                var current = this.s_;
                var size = 0;
                while (current !== null) {
                    size++;
                    current = current.n;
                }
                return size;
            };
        
            jcdu.o.LinkedList.prototype.toArray = function () {
                var iterator = this.iterator();
                var array = [];
                while (iterator.hasNext()) {
                    array.push(iterator.getValue());
                    iterator.next();
                }
                return array;
            };
        
            jcdu.o.LinkedList.prototype.remove = function (o) {
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
    })();
})(window);