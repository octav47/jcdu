(function () {
    /**
     *
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
     * @param o
     * @returns {boolean}
     */
    jcdu.o.Set.prototype.contains = function (o) {
        return this.set_.indexOf(o) !== -1;
    };

    /**
     *
     * @override
     * @type {*|string}
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
     * @type {*|string}
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
     * @returns {string}
     */
    jcdu.o.Set.prototype.getClass = function () {
        return 'jcdu.o.Set';
    };

    jcdu.o.Set.prototype.contains = jcdu.o.Abstract.method;
})();