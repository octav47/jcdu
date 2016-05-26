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



    (function (jcdu) {
        jcdu.o = {};
        
        jcdu.o.Abstract = function () {};
        
        jcdu.o.Abstract.prototype.getClass = function () {
            return 'jcdu.o.Abstract';
        };
        
        jcdu.o.Abstract.prototype.method = function () {
            return null;
        };
        
        jcdu.o.NoSuchElementException = function(message) {
            this.message = message || '';
        };
        jcdu.inherit(jcdu.o.NoSuchElementException, Error);
        
        jcdu.o.NoSuchElementException.prototype.name = 'NoSuchElementException';
        jcdu.o.OperationNotSupported = function(message) {
            this.message = message || '';
        };
        jcdu.inherit(jcdu.o.OperationNotSupported, Error);
        
        jcdu.o.OperationNotSupported.prototype.name = 'OperationNotSupported';
        
        jcdu.o.Collection = function () {};
        
        jcdu.o.Collection.prototype.getClass = function () {
            return 'jcdu.o.Collection';
        };
        
        jcdu.o.Collection.prototype.add = jcdu.o.Abstract.method;
        jcdu.o.Collection.prototype.addAll = jcdu.o.Abstract.method;
        jcdu.o.Collection.prototype.isEmpty = jcdu.o.Abstract.method;
        jcdu.o.Collection.prototype.iterator = jcdu.o.Abstract.method;
        jcdu.o.Collection.prototype.size = jcdu.o.Abstract.method;
        jcdu.o.Collection.prototype.toArray = jcdu.o.Abstract.method;
        jcdu.o.Collection.prototype.remove = jcdu.o.Abstract.method;
        jcdu.o.Iterator = function () {};
        
        jcdu.o.Iterator.prototype.getClass = function () {
            return 'jcdu.o.Iterator';
        };
        
        jcdu.o.Iterator.prototype.hasNext = jcdu.o.Abstract.method;
        jcdu.o.Iterator.prototype.next = jcdu.o.Abstract.method;
        jcdu.o.Iterator.prototype.remove = jcdu.o.Abstract.method;
        
        jcdu.o.Set = function () {};
        
        jcdu.inherit(jcdu.o.Set, jcdu.o.Collection);
        
        jcdu.o.Set.prototype.getClass = function () {
            return 'jcdu.o.Set';
        };
        
        jcdu.o.Set.prototype.contains = jcdu.o.Abstract.method;
        jcdu.o.SortedSet = function() {};
        jcdu.inherit(jcdu.o.SortedSet, jcdu.o.Set);
        
        jcdu.o.SortedSet.prototype.getClass = function () {
            return 'jcdu.o.SortedSet';
        };
        (function () {
            var Collection = jcdu.o.Collection;
        
            jcdu.o.TreeSet = function () {
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
        
            jcdu.o.TreeSet.prototype.getClass = function () {
                return 'jcdu.o.TreeSet';
            };
        
            jcdu.o.TreeSet.prototype.contains = function (o) {
                for (var i = 0, len = this.array_.length; i < len; i++) {
                    var e = this.array_[i];
                    if (e === o) {
                        return true;
                    }
                }
                return false;
            };
        
            jcdu.o.TreeSet.prototype.add = function (o) {
                if (this.contains(o)) {
                    return false;
                }
        
                for (var i = 0, len = this.array_.length; i < len; i++) {
                    var e = this.array_[i];
                    if (e === o) {
                        this.array_.splice(i, 0, o);
                        return true;
                    }
                }
        
                this.array_.push(o);
        
                return true;
            };
        
            jcdu.o.TreeSet.prototype.addAll = function (c) {
                for (var i = c.iterator(); i.hasNext();) {
                    this.add(i.next());
                }
                return true;
            };
        
            jcdu.o.TreeSet.prototype.remove = function (e) {
                // TODO
                throw new jcdu.o.OperationNotSupported();
            };
        
            jcdu.o.TreeSet.prototype.size = function () {
                return this.array_.length;
            };
        
            jcdu.o.TreeSet.prototype.isEmpty = function () {
                return this.array_.length === 0;
            };
        
            jcdu.o.TreeSet.prototype.toArray = function () {
                var array = [];
        
                for (var i = 0, len = this.array_.length; i < len; i++) {
                    array.push(this.array_[i]);
                }
        
                return array;
            };
        
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
        
        jcdu.o.List = function() {};
        jcdu.inherit(jcdu.o.List, jcdu.o.Collection);
        
        jcdu.o.List.prototype.get = jcdu.o.Abstract.method;
        
        jcdu.o.List.prototype.set = jcdu.o.Abstract.method;
        
        jcdu.o.List.prototype.isEmpty = jcdu.o.Abstract.method;
        (function () {
            var Collection = jcdu.o.Collection;
            var IndexOutOfBoundsException = jcdu.o.IndexOutOfBoundsException;
            var NoSuchElementException = jcdu.o.NoSuchElementException;
            var OperationNotSupported = jcdu.o.OperationNotSupported;
        
            jcdu.o.ArrayList = function () {
                this.array_ = [];
        
                if (arguments[0] instanceof Collection) {
                    this.addAll(arguments[0]);
                }
            };
            jcdu.inherit(jcdu.o.ArrayList, jcdu.o.List);
        
            jcdu.o.ArrayList.prototype.getClass = function () {
                return 'jcdu.o.ArrayList';
            };
        
            jcdu.o.ArrayList.prototype.add = function (e) {
                this.array_.push(e);
                return true;
            };
        
            jcdu.o.ArrayList.prototype.addAll = function (c) {
                for (var i = c.iterator(); i.hasNext();) {
                    this.add(i.next());
                }
                return true;
            };
        
            jcdu.o.ArrayList.prototype.set = function (index, element) {
                var oldElement = this.array_[index];
                this.array_[index] = element;
                return oldElement;
            };
        
            jcdu.o.ArrayList.prototype.iterator = function () {
                return new Iterator_(this);
            };
        
            jcdu.o.ArrayList.prototype.get = function (index) {
                if (index < 0 || index >= this.size()) {
                    throw new IndexOutOfBoundsException();
                }
        
                return this.array_[index];
            };
        
            jcdu.o.ArrayList.prototype.isEmpty = function () {
                return this.array_.length === 0;
            };
        
            jcdu.o.ArrayList.prototype.size = function () {
                return this.array_.length;
            };
        
            jcdu.o.ArrayList.prototype.toArray = function () {
                var array = [];
        
                for (var i = 0, len = this.array_.length; i < len; i++) {
                    array.push(this.array_[i]);
                }
        
                return array;
            };
        
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
    })(jcdu);
})();