const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const productController = require("../controllers/productController/productController");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    fs.exists("./public/uploads/" + req.user._id.toHexString(), function(exists){

      if (exists) {

        cb(null, "./public/uploads/" + req.user._id.toHexString());

      } else {

        fs.mkdir("./public/uploads/" + req.user._id.toHexString(), function( err,folder) {
          cb(null, "./public/uploads/" + req.user._id.toHexString());
        });

      }


    });
  },
  filename: function(req, file, callBack) {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var upload = multer({
  storage: storage
}).array("image");



router.post("/submitAd", upload, function(req, res) {
  productController.AdSubmitController(req, function(err, data) {
    res.json(err || data);
  });
});




router.get("/load_ads", function(req, res) {
  productController.getAdController(req, function(err, data) {
    res.json(err || data);
  });
});




router.delete("/delete_ad", function(req, res) {
  productController.deleteController(req.query.id, function(err, data) {
      if(data){
        productController.deleteFilesController(data,function(err,deleted){
            res.json(err || data);
        })
        
      }
      else{
        res.json(err);
      }
  });
});


router.get('/get_all_ads',function(req,res){
  productController.getAllAds(req,function(err,data){
    
    res.json(err || data);
  })
})


module.exports = router;
