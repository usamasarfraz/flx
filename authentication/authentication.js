const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/userModel/userModel');

var myStrategy = new localStrategy(function(username,password,next){
    User.findOne({username:username,password:password},function(err,user){
        if(user){
            next(null,user)
        }
        else{
            next(null,null);
        }
    })
})

passport.use(myStrategy);
module.exports = passport;