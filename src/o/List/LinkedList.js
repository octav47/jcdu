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