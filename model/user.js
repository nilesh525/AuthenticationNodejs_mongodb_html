var mongoose =require('mongoose');

var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/loginproj');

var db=mongoose.connection;

var userschema = mongoose.Schema({
    firstname:{
        type:String,
        index:true
    },
    lastname:{
        type:String
    },
    gender:{
        type:String
    },
    date:{
        type:Date
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    dept:{
        type:String
    },
    desc:{
        type:String
    },
    pass:{
        type:String
    },
    address:{
        type:String
    }
});

var user = module.exports =mongoose.model('user',userschema);

module.exports.createUser = function(newUser,callback){
    /*var bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.pass, salt, function(err, hash) {
                newUser.pass=hash;
                newUser.save(callback);
            });
        });*/
        newUser.save(callback);
}