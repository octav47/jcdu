(function () {
    var Collection = jcdu.o.Collection;
    var IndexOutOfBoundsException = jcdu.o.IndexOutOfBoundsException;
    var NoSuchElementException = jcdu.o.NoSuchElementException;
    var OperationNotSupported = jcdu.o.OperationNotSupported;

    jcdu.o.ArrayList = function () {
        this.array_ = [];

        if (arguments[0] instanceof Collection) {
            this.addAll(arguments[0]);
        }
    };
    jcdu.inherit(jcdu.o.ArrayList, jcdu.o.List);

    jcdu.o.ArrayList.prototype.getClass = function () {
        return 'jcdu.o.ArrayList';
    };

    jcdu.o.ArrayList.prototype.add = function (e) {
        this.array_.push(e);
        return true;
    };

    jcdu.o.ArrayList.prototype.addAll = function (c) {
        for (var i = c.iterator(); i.hasNext();) {
            this.add(i.next());
        }
        return true;
    };

    jcdu.o.ArrayList.prototype.set = function (index, element) {
        var oldElement = this.array_[index];
        this.array_[index] = element;
        return oldElement;
    };

    jcdu.o.ArrayList.prototype.iterator = function () {
        return new Iterator_(this);
    };

    jcdu.o.ArrayList.prototype.get = function (index) {
        if (index < 0 || index >= this.size()) {
            throw new IndexOutOfBoundsException();
        }

        return this.array_[index];
    };

    jcdu.o.ArrayList.prototype.isEmpty = function () {
        return this.array_.length === 0;
    };

    jcdu.o.ArrayList.prototype.size = function () {
        return this.array_.length;
    };

    jcdu.o.ArrayList.prototype.toArray = function () {
        var array = [];

        for (var i = 0, len = this.array_.length; i < len; i++) {
            array.push(this.array_[i]);
        }

        return array;
    };

    jcdu.o.ArrayList.prototype.remove = function (o) {
        var found = false;

        for (var i = 0, len = this.array_.length; i < len; i++) {
            if (this.array_[i] === o) {
                this.array_.splice(i, 1);
                found = true;
                break;
            }
        }

        return found;
    };

    var Iterator_ = function (arrayList) {
        this.arrayList_ = arrayList;
        this.position_ = 0;
    };

    Iterator_.prototype.next = function () {
        if (this.position_ === this.arrayList_.size()) {
            throw new NoSuchElementException();
        }
        return this.arrayList_.get(this.position_++);
    };

    Iterator_.prototype.hasNext = function () {
        return this.position_ < this.arrayList_.size();
    };

    Iterator_.prototype.remove = function () {
        // TODO
        throw new OperationNotSupported();
    };
})();