jcdu.o.Collection = function () {};

jcdu.inherit(jcdu.o.Collection, jcdu.o.Abstract);

/**
 *
 * @override
 * @returns {string}
 */
jcdu.o.Collection.prototype.getClass = function () {
    return 'jcdu.o.Collection';
};

jcdu.o.Collection.prototype.add = jcdu.o.Abstract.method;
jcdu.o.Collection.prototype.addAll = jcdu.o.Abstract.method;
jcdu.o.Collection.prototype.isEmpty = jcdu.o.Abstract.method;
jcdu.o.Collection.prototype.iterator = jcdu.o.Abstract.method;
jcdu.o.Collection.prototype.size = jcdu.o.Abstract.method;
jcdu.o.Collection.prototype.toArray = jcdu.o.Abstract.method;
jcdu.o.Collection.prototype.remove = jcdu.o.Abstract.method;