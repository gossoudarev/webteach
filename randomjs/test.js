import Rand from 'gossrandom';
import should from 'should';
const upper=Math.floor(Math.random()*100);
describe('#lessthan',()=>{
	it(`should be less than ${upper}`, ()=>{
		Rand.interval(0, upper).should.be.below(upper);
	});
});