(function () {
    var Collection = jcdu.o.Collection;

    /**
     *
     * @class jcdu.o.TreeSet
     * @extends {jcdu.o.SortedSet}
     * @constructor
     */
    jcdu.o.TreeSet = function () {
        /**
         *
         * @memberOf jcdu.o.TreeSet#
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