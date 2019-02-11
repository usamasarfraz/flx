const express = require('express');
const router = express.Router();
const passport = require('../authentication/authentication');
const signupController = require('../controllers/signupController/signupController');
const updateUserController = require('../controllers/updateUserController/updateUserController');
const User = require('../models/userModel/userModel');

router.post('/login_user',passport.authenticate('local'),function(req,res){
        res.json(req.user);
});

router.post('/signup_user',function(req,res){
    User.findOne({username:req.body.username},function(err,data){
        if(data){
            res.json({dataFound:true});
        }
        else{
            signupController.signupController(req.body,function(err,data){
                res.json(err || data);
            });
        }
    })
    
});

router.post('/update_user',function(req,res){
    User.findOne({username:req.body.username},function(err,data){
        if(data){
            updateUserController.updateUserController(data,req.body,function(err,data){
                res.json(err || data);
            });
        }
        else{
            res.json({dataFound:false});
        }
    })
    
})


router.get('/logout_user',function(req,res){
    req.logOut();
    res.json({logout:true});
});



router.get('/is_authenticated',function(req,res){
    res.json(req.user || {});
});


module.exports = router;