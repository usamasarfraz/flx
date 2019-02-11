let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
            adTitle:String,
            category:String,
            description:String,
            images:Array,
            phone:String,
            province:String,
            price:String,
            user_name:String,
            date:String,
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            }
});

let Ad =  mongoose.model('ad', productSchema);

module.exports = Ad;