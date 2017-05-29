/*jshint esversion: 6 */
import Timer from './index';  //import Timer from 'timerpromise';
import should from  'should';
const
      n=1,
      res = n*1000,
      timer1 = new Timer(n);

describe('#start', ()=> {
  it(`return ${res}`, ()=>
     timer1.start.should.eventually.be.exactly(res)
  );
});