const Chat = require('../../models/chatModel/chatModel');
const Ad = require('../../models/productModel/productModel');
module.exports = {
    getAllChats:function(req,callBack){
        if(req.user){
            Chat.find({$or:[{sender:req.user},{reciever:req.user}]},function(err,data){
                if(!err){
                    let check = 0;
                    let dataLength = data.length;
                    if(dataLength){
                    data.forEach((item)=>{
                        Ad.findById(item.ad,function(err,adData){
                            if(!err){
                                check++;
                                if(adData){
                                item.ad = adData;
                                }
                                if(check === dataLength){
                                callBack(null,{messages:data,user:req.user});
                                }
                            }
                    })
                    
                })
                }
                else{
                    callBack(null,{messages:data,user:req.user});
                }
                }
            })
        }
        else{
            callBack(null,{login:false});
        }
    }
}