const detect = require('../src/scripts/detect/detect');

describe('error cases', () => {
    // test('should throw an error when the csv string is not valid', () => {
    //     expect(() => detect('a*b^c,d,e')).toThrow(/[A-Za-z0-9]+/g);
    // });
    test('should not throw an error when the csv string is valid', () => {
        expect(() => detect('a^b^c^d^e')).not.toThrow();
        expect(() => detect("a,b,c,d,e\nv, w, x, y, z")).not.toThrow();
        expect(() => detect('a:b:c:d:e')).not.toThrow();
        expect(() => detect('a|b|c|d|e')).not.toThrow();
        expect(() => detect('a!b!c!d!e')).not.toThrow();
        expect(() => detect('a\tb\tc\td\te')).not.toThrow();
    });
});

describe('success cases', () => {
    test('should return a valid delimeter string.', () => {
        expect(detect('a^b^c^d^e')).toEqual('^');
        expect(detect("a,b,c,d,e\nv, w, x, y, z")).toEqual(',');
        expect(detect('a:b:c:d:e')).toEqual(':');
        expect(detect('a|b|c|d|e')).toEqual('|');
        expect(detect('a!b!c!d!e')).toEqual('!');
        expect(detect('a\tb\tc\td\te')).toEqual('\t');
    });
    test('should throw an error if the delimeter is not valid.', () => {
        expect(() => detect('a b c d e')).toThrow(/[A-Za-z0-9]+/g);
    });
});