var express = require("express");
var router = express.Router();
var User = require("../models/User.js");
var request = require('request');

router.post('/:user_id/toggleFavorite/:event_id', function (req,res,next) {
  User.findOne({_id:req.params.user_id},
  function(err,user){
    if(err){
      console.log(err);
    } else {
      console.log(user);
      if(user.account.favorites.indexOf(parseInt(req.params.event_id))===-1){
        user.account.favorites.push(parseInt(req.params.event_id));
      } else {
        user.account.favorites.splice(user.account.favorites.indexOf(parseInt(req.params.event_id)),1);
      }
      

      user.save(function(err, obj) {
        res.send('OK');
      });
    }
  })
})
  
  
  
  
  // update({_id:req.params.user_id}
  // {
  //   $set:{
  //     favorites:favorites
  //   }
  // },function(err,objects){})

module.exports = router;