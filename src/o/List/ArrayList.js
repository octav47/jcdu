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