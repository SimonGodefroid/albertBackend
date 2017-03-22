var express = require("express");
var router = express.Router();
var Event = require("../models/Event.js");

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
    console.log(events[0].evenements.realDateStart);
    }
  });
});



// router.get('/date', function (req, res,next) {
//   if(!req.query.startDate){
//     return next("startDate is mandatory");
//   }
  
//   Event.find({})
//   .
  
// });









// Paramètres reçus :
// - req.query.city obligatoire || 
// - req.query.skip || 
// - req.query.limit || 
// - req.query.priceMin || 
// - req.query.priceMax || 



module.exports = router;