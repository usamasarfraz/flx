const express = require('express');
const router = express.Router();
const favoriteAdController = require('../controllers/favoriteAdController/favoriteAdController');

router.post('/add_remove_favorite',function(req,res){
    favoriteAdController.favAddOrRemove(req,function(err,data){
        res.json(err || data);
    })
})

module.exports = router;