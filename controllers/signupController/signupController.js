const User = require('../../models/userModel/userModel');
module.exports = {
    signupController:function(data,callBack){
        
                var user = new User(data);
                user.save(callBack);
        
    }
}