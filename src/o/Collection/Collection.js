(function () {
    /**
     *
     * @memberof module:Objects
     * @class
     * @extends {CHIEF.o.Abstract}
     * @constructor
     */
    CHIEF.o.Collection = function () {
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

    CHIEF.inherit(CHIEF.o.Collection, CHIEF.o.Abstract);

    /**
     *
     * @override
     * @returns {string}
     */
    CHIEF.o.Collection.prototype.getClass = function () {
        return 'o.Collection';
    };

    /**
     *
     * @type {*|string}
     */
    CHIEF.o.Collection.prototype.contains = CHIEF.o.Abstract.method;

    /**
     *
     * @type {*|string}
     */
    CHIEF.o.Collection.prototype.add = CHIEF.o.Abstract.method;

    /**
     *
     * @type {*|string}
     */
    CHIEF.o.Collection.prototype.addAll = CHIEF.o.Abstract.method;

    /**
     *
     * @type {*|string}
     */
    CHIEF.o.Collection.prototype.isEmpty = CHIEF.o.Abstract.method;

    /**
     *
     * @type {*|string}
     */
    CHIEF.o.Collection.prototype.iterator = CHIEF.o.Abstract.method;

    /**
     *
     * @type {*|string}
     */
    CHIEF.o.Collection.prototype.size = CHIEF.o.Abstract.method;

    /**
     *
     * @type {*|string}
     */
    CHIEF.o.Collection.prototype.toArray = CHIEF.o.Abstract.method;

    /**
     *
     * @type {*|string}
     */
    CHIEF.o.Collection.prototype.remove = CHIEF.o.Abstract.method;
})();