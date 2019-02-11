const User = require('../../models/userModel/userModel');
module.exports = {
    updateUserController:function(dataWithID,data,callBack){

            User.findByIdAndUpdate(dataWithID._id,data,callBack);
                  
    }
}