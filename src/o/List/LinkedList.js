(function () {
    var Collection = jcdu.o.Collection;
    var IndexOutOfBoundsException = jcdu.o.IndexOutOfBoundsException;
    var NoSuchElementException = jcdu.o.NoSuchElementException;
    var OperationNotSupported = jcdu.o.OperationNotSupported;

    jcdu.o.LinkedList = function () {
        this.array_ = [];
        this.i_ = 0;
        this.root_ = 0;

        if (arguments[0] instanceof Collection) {
            this.addAll(arguments[0]);
        }
    };
    jcdu.inherit(jcdu.o.LinkedList, jcdu.o.List);

    jcdu.o.LinkedList.prototype.getClass = function () {
        return 'jcdu.o.LinkedList';
    };

    jcdu.o.LinkedList.prototype.add = function (e) {
        if (this.size() === 0) {
            this.array_.push({
                p: null,
                e: e,
                n: this.i_ + 1
            });
            this.root_ = this.i_;
        } else {
            this.array_.push({
                p: this.i_ - 1,
                e: e,
                n: this.i_ + 1
            });
        }
        this.i_++;
        return true;
    };

    jcdu.o.LinkedList.prototype.addAll = function (c) {
        //for (var i = c.iterator(); i.hasNext();) {
        //    this.add(i.next());
        //}
        //return true;
    };

    jcdu.o.LinkedList.prototype.set = function (index, element) {
        //var oldElement = this.array_[index];
        //this.array_[index] = element;
        //return oldElement;
    };

    jcdu.o.LinkedList.prototype.iterator = function () {
        return new Iterator_(this);
    };

    jcdu.o.LinkedList.prototype.get = function (index) {
        if (index < 0 || index >= this.size()) {
            throw new IndexOutOfBoundsException();
        }

        return this.array_[index];
    };

    jcdu.o.LinkedList.prototype.getRoot = function () {
        return this.array_[this.root_];
    };

    jcdu.o.LinkedList.prototype.isEmpty = function () {
        return Object.keys(this.array_).length === 0;
    };

    jcdu.o.LinkedList.prototype.size = function () {
        return Object.keys(this.list_).length;
    };

    jcdu.o.LinkedList.prototype.toArray = function () {
        //var array = [];
        //
        //for (var i = 0, len = this.array_.length; i < len; i++) {
        //    array.push(this.array_[i]);
        //}
        //
        //return array;
    };

    jcdu.o.LinkedList.prototype.remove = function (o) {
        //var found = false;
        //
        //for (var i = 0, len = this.array_.length; i < len; i++) {
        //    if (this.array_[i] === o) {
        //        this.array_.splice(i, 1);
        //        found = true;
        //        break;
        //    }
        //}
        //
        //return found;
    };

    var Iterator_ = function (linkedList) {
        this.linkedList_ = linkedList;
    };

    Iterator_.prototype.next = function () {
        //if (this.position_ === this.arrayList_.size()) {
        //    throw new NoSuchElementException();
        //}
        //return this.arrayList_.get(this.position_++);
    };

    Iterator_.prototype.hasNext = function () {
        //return this.position_ < this.arrayList_.size();
    };

    Iterator_.prototype.remove = function () {
        // TODO
        throw new OperationNotSupported();
    };
})();