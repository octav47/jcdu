/**
 * Abstract is nothing!
 * @memberof module:Objects
 * @constructor
 */
jcdu.o.Abstract = function () {
    /**
     * Returns class name 'jcdu.o.Abstract'
     * @returns {string}
     */
    this.getClass = function () {
        return 'jcdu.o.Abstract';
    };

    /**
     * Does nothing, returns null
     * @returns {null}
     */
    this.method = function () {
        return null;
    };
};