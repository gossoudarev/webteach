PROFIT

this goes instead of all the previous stuff with phantom and zombie

test_old.js is the manual implementation of the same testing and it has to be run with node
while test.js is serviced by mocha
 it takes a promise chain of Zombie calls
 so we visit a URL
 then click a button
 then take the result 
 and test it against expected!



ISSUES

can't use import/export together with Zombie

$ mocha --compilers js:babel-register
module.js:472
    throw err;
    ^

Error: Cannot find module './--compilers'