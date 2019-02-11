let mongoose = require('mongoose');

let chatSchema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    date:String,
    message:String,
    adUser:String,
    ad:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ad'
    }
});

let chat =  mongoose.model('chat', chatSchema);

module.exports = chat;