const AD = require('../../models/productModel/productModel');
const FAV = require('../../models/favoriteAdModel/favoriteAdModel');
const fs = require('fs');
module.exports = {
    AdSubmitController:function(req,callBack){
        if(req.body._id && req.user){
            var images = [];
            if(req.files.length){
                for(var i = 0; i < req.files.length; i++){
                images.push(req.files[i].path);
                }
            }
            req.body.image.map((item)=>{
                if(item){
                    images.push(item);
                }
            })
            req.body.images = images;
            AD.findByIdAndUpdate(req.body._id,req.body,callBack);
        }
        else{
        if(req.user){
            var images = [];
            for(var i = 0; i < req.files.length; i++){
                images.push(req.files[i].path);
            }
            req.body.images = images;
            req.body.user = req.user;
            req.body.date = new Date().toLocaleDateString();
            var ad = new AD(req.body);
            ad.save(callBack);
        }
        else{
            callBack(null,{userLogin:false});
        }
    }
        
    },


    getAdController:function(req,callBack){
        if(req.user){
            AD.find({user:req.user._id},callBack)
        }
    },



    deleteController:function(id,callBack){
        AD.findByIdAndRemove(id,function(err,data){
            if(!err){
                FAV.remove({ad:id},function(err,removed){
                    if(!err){
                        callBack(err,data);
                    }
                })
            }
        });
    },




    deleteFilesController:function(data,callBack){
        data.images.map((item)=>{
        fs.unlink(item, function(err,success){
            if(err){
               callBack(err);
            }
            console.log(item + ' deleted.')
        });
        })
        callBack(null,{itemsDeleted:true})
    },



    getAllAds:function(req,callBack){
        AD.find({},function(err,data){
            if(req.user){
                let ads = data.filter(function(item){
                    return req.user._id.toHexString() != item.user.toHexString();
                })
                FAV.find({user:req.user},function(err,data){
                    if(!err){
                        callBack(err,{ads:ads,fav:data});
                    }
                })
            }
            else{
                callBack(err,data);
            }
        })
        
    }
}