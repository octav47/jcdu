(function () {
    /**
     *
     * @memberof module:Objects
     * @class
     * @extends {CHIEF.o.Abstract}
     * @constructor
     */
    CHIEF.o.Random = function () {
        this.seed_ = (new Date()).getTime();
        this.multiplier = 0x5DEECE66D;
        this.addend = 0xB;
        this.mask = (1 << 48) - 1;
    };

    CHIEF.inherit(CHIEF.o.Random, CHIEF.o.Abstract);

    /**
     *
     * @override
     * @returns {string}
     */
    CHIEF.o.Random.prototype.getClass = function () {
        return 'o.Random';
    };

    CHIEF.o.Random.prototype.next = function () {
        var args = CHIEF.utils.argumentsToArray(arguments);
        if (typeof args[0] === 'number') {
            var bits = args[0];
            return (this.seed_ * this.multiplier + this.addend) >>> (48 - bits);
        }
    }
})();