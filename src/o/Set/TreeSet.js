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