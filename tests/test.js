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