(function () {
    /**
     *
     * @memberof module:Objects
     * @class
     * @extends {jcdu.o.Abstract}
     * @constructor
     */
    jcdu.o.Random = function () {
        this.seed_ = (new Date()).getTime();
        this.multiplier = 0x5DEECE66D;
        this.addend = 0xB;
        this.mask = (1 << 48) - 1;
    };

    jcdu.inherit(jcdu.o.Random, jcdu.o.Abstract);

    /**
     *
     * @override
     * @returns {string}
     */
    jcdu.o.Random.prototype.getClass = function () {
        return 'jcdu.o.Random';
    };

    jcdu.o.Random.prototype.next = function () {
        var args = jcdu.utils.argumentsToArray(arguments);
        if (typeof args[0] === 'number') {
            var bits = args[0];
            return (this.seed_ * this.multiplier + this.addend) >>> (48 - bits);
        }
    }
})();