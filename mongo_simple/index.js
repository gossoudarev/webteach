/*jshint esversion: 6 */
import m from 'mongoose';

const  UserSchema = new m.Schema({
                	"user": { "type": "String" },
      		  		"password": { "type": "String" }
     			 }),
       User = m.model('User', UserSchema);
m.Promise = global.Promise;
m.connect('mongodb://student_account:Qwerty.123@kodaktor.ru/experimental', {}, err=>{if(err)throw err;});
 
User.find().exec()
  .then(x=>{
  	console.log(x);
  	process.exit(0);
  });
   
