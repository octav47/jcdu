jcdu.o.IndexOutOfBoundsException = function(message) {
    this.message = message || '';
};
jcdu.inherit(jcdu.o.IndexOutOfBoundsException, Error);

jcdu.o.IndexOutOfBoundsException.prototype.name = 'IndexOutOfBoundsException';