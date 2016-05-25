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