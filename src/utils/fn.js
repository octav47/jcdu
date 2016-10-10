/**
 * Extends jcdu object
 * @memberof module:Utils
 * @param {string} propertyName Name of propery to be extended
 * @param {Function} [extension] Callback for extension
 */
jcdu.fn = function (propertyName, extension) {
    if (this[propertyName] === undefined && extension === undefined) {
        this[propertyName] = {};
    } else {
        this[propertyName] = extension;
        //extension(this[propertyName]);
    }
};

/**
 * Plugs an extension
 * @memberof module:Utils
 * @param {string} pluginName Plugin name
 * @param {Function} extension Plugin body
 *
 * @example
 * // Create a plugin, that alerts 'Hello, World!'
 * jcdu.plug('helloworld', function () {
 *     alert('Hello, World!');
 * });
 *
 * // Invoke new helloworld-plugin
 * jcdu.plugin.helloworld();
 *
 * // or shorter
 * jcdu.p.helloworld();
 */
jcdu.plug = function (pluginName, extension) {
    if (this[pluginName] !== undefined) {
        throw 'Plugin name ' + pluginName + ' is already in use';
    } else {
        this.fn(pluginName, extension);
    }
};