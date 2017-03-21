var express = require("express");
var router = express.Router();

var Event = require("../models/Event.js");

router.get("/home", function(req, res, next) {
  City.find()
    .exec()
    .then(function(events) {
      Room.findRandom({}, {}, { limit: 3 }, function(err, rooms) {
        res.json({
          events: events || [],
        });
      });
    })
    .catch(function(err) {
      res.status(400);
      return next(err.message);
    });
});

module.exports = router;