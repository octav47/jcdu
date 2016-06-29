describe('init: global', function() {
    it('init', function() {
        assert.notEqual(window.jcdu, undefined);
    });
    //it('array functions', function() {
    //    assert.notEqual(jcdu.browserFunctions, undefined);
    //});
    it('browser functions', function() {
        assert.notEqual(jcdu.browserFunctions, undefined);
    });
    it('number functions', function() {
        assert.notEqual(jcdu.numberFunctions, undefined);
    });
    it('string functions', function() {
        assert.notEqual(jcdu.stringFunctions, undefined);
    });
    it('utils', function() {
        assert.notEqual(jcdu.utils, undefined);
    });
    it('o', function() {
        assert.notEqual(jcdu.o, undefined);
    });
});

describe('init: array functions prototype', function() {
    var a = [];
    it('init', function() {
        assert.notEqual(a.clean, undefined);
    });
    it('contains', function() {
        assert.notEqual(a.contains, undefined);
    });
    it('containsObjectById', function() {
        assert.notEqual(a.containsObjectById, undefined);
    });
    it('mapJoinString', function() {
        assert.notEqual(a.mapJoinString, undefined);
    });
    it('move', function() {
        assert.notEqual(a.move, undefined);
    });
});

describe('array clean', function() {
    it('clean undefined', function() {
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, undefined, '', 0, 'abcde'];
        assert.deepEqual(a.clean(), [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'abcde']);
    });
    it('clean 0 (number)', function() {
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, undefined, '', 0, 'abcde'];
        assert.deepEqual(a.clean(0), [1, 2, 3, 4, 5, 6, 7, 8, 9, undefined, '', 'abcde']);
    });
    it('clean empty string', function() {
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, undefined, '', 0, 'abcde'];
        assert.deepEqual(a.clean(''), [1, 2, 3, 4, 5, 6, 7, 8, 9, undefined, 0, 'abcde']);
    });
    it('clean string', function() {
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, undefined, '', 0, 'abcde'];
        assert.deepEqual(a.clean('abcde'), [1, 2, 3, 4, 5, 6, 7, 8, 9, undefined, '', 0]);
    });
});

describe('o.Set', function() {
    // TODO
    it('init', function() {
        assert.notEqual(jcdu.o.Set, undefined);
    });

    it('get class', function() {
        var ts = new jcdu.o.Set();
        assert.equal(ts.getClass(), 'jcdu.o.Set');
    });

    it('contains', function() {
        var a = new jcdu.o.Set();
        a.add(1);
        a.add(2);
        a.add(3);
        assert.equal(a.contains(2), true);
        assert.equal(a.contains(4), false);
    });

    it('add', function() {
        var a = new jcdu.o.Set();
        a.add(1);
        a.add(2);
        a.add(3);
        a.add(3);
        assert.deepEqual(a.toArray(), [1, 2, 3]);
        a.add(4);
        a.add([5]);
        assert.deepEqual(a.toArray(), [1, 2, 3, 4, [5]]);
    });

    it('addAll', function() {
        var a = new jcdu.o.Set(),
            b = new jcdu.o.Set();
        a.add(1);
        a.add(2);
        a.add(3);
        a.add(3);
        b.addAll(a);
        assert.deepEqual(a.toArray(), b.toArray());
        a.add(4);
        a.add([5]);
        b.addAll(a);
        assert.deepEqual(a.toArray(), b.toArray());
    });

    it('remove', function() {
        var a = new jcdu.o.Set();
        a.add(1);
        a.add(2);
        a.add(3);
        a.remove(2);
        assert.deepEqual(a.toArray(), [1, 3]);
    });

    it('size', function() {
        var a = new jcdu.o.Set();
        a.add(1);
        a.add(2);
        a.add(3);
        assert.equal(a.size(), 3);
    });

    it('isEmpty', function() {
        var a = new jcdu.o.Set();
        a.add(1);
        a.add(2);
        a.add(3);
        assert.equal(a.isEmpty(), false);
        a = new jcdu.o.TreeSet();
        assert.equal(a.isEmpty(), true);
    });
});

describe('o.SortedSet', function() {
    // TODO
    it('init', function() {
        assert.notEqual(jcdu.o.SortedSet, undefined);
    });
});

describe('o.TreeSet', function() {
    // TODO
    it('init', function() {
        assert.notEqual(jcdu.o.TreeSet, undefined);
    });

    it('get class', function() {
        var ts = new jcdu.o.TreeSet();
        assert.equal(ts.getClass(), 'jcdu.o.TreeSet');
    });

    it('contains', function() {
        var a = new jcdu.o.TreeSet();
        a.add(1);
        a.add(2);
        a.add(3);
        assert.equal(a.contains(2), true);
        assert.equal(a.contains(4), false);
    });

    it('add', function() {
        var a = new jcdu.o.TreeSet();
        a.add(1);
        a.add(2);
        a.add(3);
        a.add(3);
        assert.deepEqual(a.toArray(), [1, 2, 3]);
        a.add(4);
        a.add([5]);
        assert.deepEqual(a.toArray(), [1, 2, 3, 4, [5]]);
    });

    it('addAll', function() {
        var a = new jcdu.o.TreeSet(),
            b = new jcdu.o.TreeSet();
        a.add(1);
        a.add(2);
        a.add(3);
        a.add(3);
        b.addAll(a);
        assert.deepEqual(a.toArray(), b.toArray());
        a.add(4);
        a.add([5]);
        b.addAll(a);
        assert.deepEqual(a.toArray(), b.toArray());
    });

    it('remove', function() {
        var a = new jcdu.o.TreeSet();
        a.add(1);
        a.add(2);
        a.add(3);
        a.remove(2);
        assert.deepEqual(a.toArray(), [1, 3]);
    });

    it('size', function() {
        var a = new jcdu.o.TreeSet();
        a.add(1);
        a.add(2);
        a.add(3);
        assert.equal(a.size(), 3);
    });

    it('isEmpty', function() {
        var a = new jcdu.o.TreeSet();
        a.add(1);
        a.add(2);
        a.add(3);
        assert.equal(a.isEmpty(), false);
        a = new jcdu.o.TreeSet();
        assert.equal(a.isEmpty(), true);
    });
});

var ArrayList = jcdu.o.ArrayList;

describe('ArrayList', function() {
    var arrayList;
    var iterator;
    var first;
    var second;
    var toBeRemoved;

    it('can be constructed', function() {
        arrayList = new ArrayList();
        expect(arrayList).to.exist;
    });

    it('can be constructed with type', function() {
        arrayList = new ArrayList('string');
        expect(arrayList).to.exist;
        assert.equal(arrayList.getType(), 'string');
        arrayList = new ArrayList('wrong type');
        assert.equal(arrayList.getType(), '');
    });

    it('one element can be appended', function() {
        first = 1;

        arrayList.add(first);

        expect(arrayList.size()).to.equal(1);
    });

    it('another element can be appended', function() {
        second = {};

        arrayList.add(second);

        expect(arrayList.size()).to.equal(2);
    });

    it('can be iterated', function() {
        iterator = arrayList.iterator();

        expect(iterator.next()).to.equal(first);
    });

    it('iterator should report more elements available', function() {
        expect(iterator.hasNext()).to.be.true;
    });

    it('can be iterated again', function() {
        expect(iterator.next()).to.equal(second);
    });

    it('iterator should report no more elements available', function() {
        expect(iterator.hasNext()).to.be.false;
    });

    it('throws when iterating beyond end', function() {
        try {
            iterator.next();
        }
        catch (e) {
            expect(e.name).to.equal('NoSuchElementException');
        }
    });

    it('iteration can be for looped', function() {
        var count = 0;
        for (var i = arrayList.iterator(); i.hasNext();) {
            var e = i.next();
            count++;
        }
        expect(count).to.equal(2);
    });

    it('can remove an item', function() {
        var count = arrayList.size();
        arrayList.add(toBeRemoved);
        arrayList.remove(toBeRemoved);
        expect(arrayList.size()).to.equal(count);
    });
});

var LinkedList = jcdu.o.LinkedList;

describe('LinkedList', function() {
    var linkedList;
    var iterator;
    var first;
    var second;
    var toBeRemoved;

    it('can be constructed', function() {
        linkedList = new LinkedList();
        expect(linkedList).to.exist;
    });

    it('one element can be appended', function() {
        first = 1;

        linkedList.add(first);

        expect(linkedList.size()).to.equal(1);
    });

    it('another element can be appended', function() {
        second = {};

        linkedList.add(second);

        expect(linkedList.size()).to.equal(2);
    });

    it('can return element by index', function() {
        expect(linkedList.get(0)).to.equal(first);
        expect(linkedList.get(1)).to.equal(second);
    });

    it('can be iterated', function() {
        iterator = linkedList.iterator();

        expect(iterator.getValue()).to.equal(first);
    });

    it('iterator should report more elements available', function() {
        expect(iterator.hasNext()).to.be.true;
    });

    it('can be iterated again', function() {
        iterator.next();
        expect(iterator.getValue()).to.equal(second);
    });

    it('iterator should report no more elements available', function() {
        expect(iterator.hasNext()).to.be.false;
    });

    it('throws when iterating beyond end', function() {
        try {
            iterator.next();
        }
        catch (e) {
            expect(e.name).to.equal('NoSuchElementException');
        }
    });

    it('iteration can be for looped', function() {
        var iterator = linkedList.iterator();
        var count = 0;
        while (iterator.hasNext()) {
            count++;
            iterator.next();
        }
        expect(count).to.equal(2);
    });

    it('can remove an item', function() {
        var count = linkedList.size();
        linkedList.add(toBeRemoved);
        linkedList.remove(toBeRemoved);
        expect(linkedList.size()).to.equal(count);
    });
});