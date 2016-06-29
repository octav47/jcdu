(function (window, undefined) {
    /**
     *
     * @function
     * @param a
     * @constructor
     */
    function ClassA(a) {
        this.a = a;
    }

    /**
     *
     * @returns {*}
     */
    ClassA.prototype.getA = function () {
        return this.a;
    };

    /**
     *
     * @param a
     */
    ClassA.prototype.setA = function (a) {
        this.a = a;
    };

    /**
     *
     * @param b
     * @constructor
     */
    function ClassB(b) {
        this.b = b;
    }

    /**
     *
     * @returns {*}
     */
    ClassB.prototype.getB = function () {
        return this.b;
    };

    /**
     *
     * @param b
     */
    ClassB.prototype.setB = function (b) {
        this.b = b;
    };
})(window);