var express = require("express");
var router = express.Router();
var Event = require("../models/Event.js");


router.get('/', function (req, res,next) {
  if(!req.query.category){
    return next("Category is mandatory");
  }
  
  Event.find({
    albertCat: { $in: [parseInt(req.query.category)]},
  }, function (err, events) {
    if (err) {
      console.log('An error occurred' + err);
    } else {
    res.json({
      events:events,
      count: events.length
    });
    }
  });
});









// affiche tous les events pour la dev
router.get('/all', function (req, res) {
  Event.find({}, function (err, events) { // on récupère dans mongodb via mongoose toutes les entrées dans un tableau.
    if (err) {
      console.log('An error occurred' + err);
    } else {
      console.log(events);
    res.json({
      events:events,
      count: events.length
    }); 
    }
  });
});

router.get('/', function (req, res,next) {
  if(!req.query.category){
    return next("Category is mandatory");
  }
  
  Event.find({
    albertCat: { $in: [parseInt(req.query.category)]},
  }, function (err, events) {
    if (err) {
      console.log('An error occurred' + err);
    } else {
    res.json({
      events:events,
      count: events.length
    });
    }
  });
});




var currentTime = new Date();
var month = (currentTime.getMonth() + 1) >10 ? currentTime.getMonth() + 1 : '0'+ (currentTime.getMonth() + 1);
var day = currentTime.getDate();
var year = currentTime.getFullYear();

var today = year + "-" + month + "-" + day;



router.get('/date', function (req, res,next) {
  console.log(today);
  if(!req.query.dateBegin){
    console.log("pas de dateBegin",req.query.dateBegin);
    
    Event.
  find({
    'evenements.realDateStart': {$gte: new Date (today),$lte: new Date (req.query.dateEnd)}})
    .sort({'evenements.realDateStart': 'ascending'})
    .exec(function (err, events) {
      if (err) {
        console.log('An error occurred' + err);
      } else {        
        res.json({
          events:events,
          count: events.length
        }); 
      }
    });
  } else {
    Event.
    find({
      'evenements.realDateStart': {$gte: new Date (req.query.dateBegin),$lte: new Date (req.query.dateEnd)}})
    .sort({'evenements.realDateStart': 'ascending'})
    .exec(function (err, events) {
      if (err) {
        console.log('An error occurred' + err);
      } else {        
        res.json({
          events:events,
          count: events.length
        }); 
      }
    });
  };
});

// Paramètres reçus :
// - req.query.category obligatoire || 
// - req.query.skip || 
// - req.query.limit || 
// - req.query.dateBegin || 
// - req.query.dateEnd || 
module.exports = router;