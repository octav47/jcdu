/*
* main file
 */

(function (window, undefined) {

    var jcdu = {};

    if (!window.jcdu) {
        window.jcdu = jcdu;
    }

    (function () {
        jcdu.utils = {};
    
        /**
         * Extends jcdu object
         * @param {string} propertyName
         */
        jcdu.fn = function (propertyName) {
            this[propertyName] = {};
        };
        /**
         * Extends obj with other objects in arguments
         * @param obj
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
         * @param {object} object
         * @param {object} parent
         */
        jcdu.inherit = function (object, parent) {
            object.prototype = Object.create(parent.prototype);
        };
        
        jcdu.utils.inherit = jcdu.inherit;
        /**
         * Returns true if object is array, false otherwise
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
         * @param {string} format d is for day, M is for month, Y is for full year
         */
        jcdu.utils.now = function (format) {
            var now = new Date();
            return jcdu.utils.getFormattedDate(now, format);
        };
    })();

    (function () {
        jcdu.fn('browserFunctions');
    
        /**
         * Returns true if browser is Firefox, false otherwise
         * @returns {boolean}
         */
        jcdu.browserFunctions.isFirefox = function () {
            return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        };
    })();

    (function () {
        jcdu.fn('arrayFunctions');
    
        /**
         * Remove all occurrences of deleteValue if array
         * @param deleteValue
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
         * @param {string} separator
         * @param {string} prefix
         * @param {string} suffix
         * @returns {string}
         */
        Array.prototype.mapJoinString = function (separator, prefix, suffix) {
            separator = (separator === undefined) ? '' : separator;
            prefix = (prefix === undefined) ? '' : prefix;
            suffix = (suffix === undefined) ? '' : suffix;
            return this.map(function (e) {
                return prefix + e + suffix;
            }).join(separator);
        };
        /**
         * Moves array's element from old_index to new_index
         * @param {number} old_index
         * @param {number} new_index
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
         * @param obj
         * @returns {boolean}
         */
        Array.prototype.contains = function(obj) {
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
         * @deprecated
         * @param id
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
        jcdu.fn('stringFunctions');
    
        /**
         * Truncates string and replaces last three characters with '...', if string length is more than maxlength
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
        jcdu.fn('numberFunctions');
    
        /**
         * Returns true if n is numeric, false otherwise
         * @param {object} n
         * @returns {boolean}
         */
        jcdu.numberFunctions.isNumeric = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        /**
         * Returns random float from specified range from min to max
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        jcdu.numberFunctions.getRandomNumber = function (min, max) {
            return Math.random() * (max - min) + min;
        };
        /**
         * Return random int from specified range from min to max (both inclusive)
         * @param {number} min
         * @param {number} max
         * @returns {*}
         */
        jcdu.numberFunctions.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
    })();

    (function () {
        jcdu.fn('o');
    
        /**
         * Abstract is nothing!
         * @constructor
         */
        jcdu.o.Abstract = function () {};
        
        /**
         *
         * @returns {string}
         */
        jcdu.o.Abstract.prototype.getClass = function () {
            return 'jcdu.o.Abstract';
        };
        
        /**
         *
         * @returns {null}
         */
        jcdu.o.Abstract.prototype.method = function () {
            return null;
        };
    
        /**
         *
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
    
        /**
         *
         * @class
         * @extends {jcdu.o.Abstract}
         * @constructor
         */
        jcdu.o.Collection = function () {};
        
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
        /**
         *
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
    
        /**
         *
         * @class
         * @extends {jcdu.o.Collection}
         * @constructor
         */
        jcdu.o.Set = function () {};
        
        jcdu.inherit(jcdu.o.Set, jcdu.o.Collection);
        
        /**
         *
         * @override
         * @returns {string}
         */
        jcdu.o.Set.prototype.getClass = function () {
            return 'jcdu.o.Set';
        };
        
        jcdu.o.Set.prototype.contains = jcdu.o.Abstract.method;
        /**
         *
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
        
            /**
             * 123
             */
            jcdu.inherit(jcdu.o.TreeSet, jcdu.o.SortedSet);
        
            /**
             *
             * @override
             * @returns {string}
             */
            jcdu.o.TreeSet.prototype.getClass = function () {
                return 'jcdu.o.TreeSet';
            };
        
            /**
             *
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