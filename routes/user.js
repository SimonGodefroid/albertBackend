var express = require("express");
var router = express.Router();
var User = require("../models/User.js");
var Event = require("../models/Event.js");
var request = require('request');

router.get("/:user_id/favorites", function(req,res,next) {
  User.findById(req.params.user_id)
    .populate("account.favorites")
    .exec()
    .then(function(user) {
      console.log('Route user/:user_id/favorites ',user);
      if (!user) {
        res.status(404);
        return next("User not found");
      }
      return res.json(user.account.favorites);
    })
    .catch(function(err) {
      res.status(400);
      return next(err.message);
    });
});















router.post('/:user_id/toggleFavorite/:provider_id', function (req,res,next) {
  User.findOne({_id:req.params.user_id},
  function(err,user){
    if(err){
      console.log(err);
    } else {
      console.log(user);
      Event.findOne({idProvider:req.params.provider_id}, function(err,event){
        if(err){
          console.log(err);
        } else {
          if(user.account.favorites.indexOf(parseInt(req.params.provider_id))===-1){
            user.account.favorites.push(event);
          } else {
          //  user.account.favorites.splice(user.account.favorites.indexOf(parseInt(req.params.event_id)),1);
            console.log(user.account.favorites);
          }
          user.save(function(err, obj) {
            res.send('OK');
          });
        }
      });
    }
  });
});
  
  
  
  
  // update({_id:req.params.user_id}
  // {
  //   $set:{
  //     favorites:favorites
  //   }
  // },function(err,objects){})

module.exports = router;