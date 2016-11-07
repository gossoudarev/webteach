var test = require('tape'),
    tern = require('./tern');




test('ternary function 1', assert => {
    const actual = typeof tern(''),
	      expected = 'NaN';
    
    assert.equal(actual, expected, 'tern() should return NaN');
	//провал - почему? 
	//потому что мы ожидаем NaN по смыслу
	//а функция tern возвращает строку по факту
	//т.е. мы видим в консоли NaN, но это - строка, а не значение NaN
    
    assert.end();
});

test('ternary function 2', assert => {
    const actual = tern(5),
	      expected = 'Number';
    
    assert.equal(actual, expected, 'tern(5) should return the literal string "Number"');
	//провал - почему? 
	//потому что мы ожидаем NaN по смыслу
	//а функция tern возвращает строку по факту
	//т.е. мы видим в консоли NaN, но это - строка, а не значение NaN
    
    assert.end();
});

