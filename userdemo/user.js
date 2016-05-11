function User(name){
  this.name = name;
}
User.prototype.hello=usr=>console.log('Hello, %s!', usr.name);

module.exports.createUser = User;
