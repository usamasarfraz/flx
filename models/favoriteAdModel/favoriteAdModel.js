let mongoose = require('mongoose');

let favoriteAdSchema = mongoose.Schema({
            ad:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'ad'
            },
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            }
});

let favoriteAd =  mongoose.model('favAd', favoriteAdSchema);

module.exports = favoriteAd;