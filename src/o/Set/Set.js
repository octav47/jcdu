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
     * @param c iterator
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
     * @override
     * @param e
     */
    jcdu.o.Set.prototype.remove = function (e) {
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
    jcdu.o.Set.prototype.size = function () {
        return this.set_.length;
    };

    /**
     *
     * @override
     * @returns {boolean}
     */
    jcdu.o.Set.prototype.isEmpty = function () {
        return this.set_.length === 0;
    };

    /**
     *
     * @type {Array}
     */
    jcdu.o.Set.prototype.toArray = function () {
        return [].concat(this.set_);
    };

    /**
     *
     * @override
     * @returns {Iterator_}
     */
    jcdu.o.Set.prototype.iterator = function () {
        return new Iterator_(this);
    };

    var Iterator_ = function (set_) {
        this.set_ = set_;
        this.position_ = 0;
    };

    Iterator_.prototype.next = function () {
        if (this.position_ === this.set_.size()) {
            throw new jcdu.o.NoSuchElementException();
        }
        return this.set_.set_[this.position_++];
    };

    Iterator_.prototype.hasNext = function () {
        return this.position_ < this.set_.size();
    };

    Iterator_.prototype.remove = function () {
        // TODO
        throw new jcdu.o.OperationNotSupported();
    };
})();