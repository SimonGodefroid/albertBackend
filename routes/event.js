var express = require("express");
var router = express.Router();
var Event = require("../models/Event.js");
var request = require('request');

router.get('/:id', function (req, res) {
  console.log("showing event with id",req.params.id);
  Event.findOne({'idProvider' : req.params.id })
  .exec(function (err, event) {
    if (err) {
      console.log('An error occurred' + err);
    } else {
      res.json({
        event:event,
        //count: event.length
      });
    }
  });
});

module.exports = router;
