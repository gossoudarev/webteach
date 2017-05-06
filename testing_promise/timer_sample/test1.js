/*jshint esversion: 6 */
const Timer = require('./Timer'),
      should = require('should'),
      n=1,
      res = n*1000,
      timer1 = new Timer(n);

describe('#start', ()=> {
  it('return n*1000', ()=>
     timer1.start.should.eventually.be.exactly(res)
  );
});