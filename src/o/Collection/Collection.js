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