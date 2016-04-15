function User(name){
  this.name = name;
}
User.prototype.hello = function(usr){
  console.log('Hello, ' + usr.name  + '!');
};

module.exports.createUser = User;
