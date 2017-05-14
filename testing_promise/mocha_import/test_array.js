/*jshint esversion: 6 */
import m from 'mongoose';
import should from 'should';
const      
       UserSchema = new m.Schema({
                	"user": { "type": "String" },
      		  		"password": { "type": "String" }
     			 }),
       User = m.model('User', UserSchema),
	   testcases = [{name:'John', fname:'Resig'}, {name:'Dmitry', fname:'Ibragimov'}];
       
m.Promise = global.Promise;
m.connect('mongodb://student_account:Qwerty.123@kodaktor.ru/experimental', {}, err=>{if(err)throw err;});

testcases.forEach(tcase=>{   
	describe('#findOne()', ()=> {
  		it('respond with one matching record', ()=>
    		 User.findOne({ name: tcase.name }).should.eventually.have.property('_doc')
         		 .with.property('fname',tcase.fname)
  		);
	});
});