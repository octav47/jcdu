/**
 * Abstract is nothing!
 * @memberof module:Objects
 * @constructor
 */
jcdu.o.Abstract = function () {
    /**
     *
     * @returns {string}
     */
    this.getClass = function () {
        return 'jcdu.o.Abstract';
    };

    /**
     *
     * @returns {null}
     */
    this.method = function () {
        return null;
    };
};