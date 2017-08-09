console.log("test")
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/test')
var userSchema = mongoose.Schema({
    username: String,
    first: String,
    last: String,
    status: {type: String, enum: ["MARRIED", "SINGLE"]},
    dob: Date,
    created: {type: Date, default: Date.now()},
}, {collection: "user"});

var userModel = mongoose.model("UserModel", userSchema);
// var userModel = mongoose.model("UserModel", userSchema);
function findByUsername() {
    return userModel.findOne({username: "alice"});
    // return userModel.find({username: "alice"});
}
function removeUser(userId, newUser) {
    userModel.remove({_id: userId});
}
removeUser("12234").then(function(status){
    console.log(status);
});
function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {$set:newUser});
}
updateUser("12234",{first:'alice', last: 'wonder'}).then(function(msg){
    console.log(msg);
});
function findAllUsers() {
        return userModel.find();
}
function createUser(user){
    userModel.create(user, function (err){
        if(err){
            console.log("error");
        }
        else{
            console.log("success");
        }
    });
}
var user = {username: 'alice'};
createUser(user);

var promise = findAllUsers();
promise.then(function(users) {
    console.log(users);
});
