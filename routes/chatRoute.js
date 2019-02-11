const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController/chatController');

router.get('/request_for_chats',function(req,res){
    chatController.getAllChats(req,function(err,data){
        res.json(err || data);
    })
})

module.exports = router;