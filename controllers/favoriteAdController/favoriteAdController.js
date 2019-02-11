const FavAd = require('../../models/favoriteAdModel/favoriteAdModel');
module.exports = {
    favAddOrRemove:function(req,callBack){
        if(req.user){
            FavAd.findOne({user:req.user,ad:req.body.ad},function(err,data){
                if(err){
                    callBack(err,null);
                }
                else if(data){
                    FavAd.findByIdAndRemove(data.id,function(err,data){
                        if(!err){
                            callBack(null,data);
                        }
                    })
                }
                else{
                    req.body.user = req.user;
                    var fav = new FavAd(req.body);
                    fav.save(function(err,data){
                        if(!err){
                            callBack(null,data);
                        }
                    });
                }
            })
        }
        else{
            callBack(null,{login:false});
        }
    }
}