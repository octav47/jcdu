jcdu.o.NoSuchElementException = function(message) {
    this.message = message || '';
};
jcdu.inherit(jcdu.o.NoSuchElementException, Error);

jcdu.o.NoSuchElementException.prototype.name = 'NoSuchElementException';