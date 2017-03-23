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
  Event.find({})
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
});

router.get('/', function (req, res,next) {
  if(!req.query.category){
    return next("Category is mandatory");
  }
  
  Event.find({
    albertCat: { $in: [parseInt(req.query.category)]},
  })
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
});


var currentTime = new Date();
var today = new Date( currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate());






router.get('/date', function (req, res,next) {
  Event.
  find({
    'evenements.realDateStart': {$lte: today},
    'evenements.realDateEnd': {$gte: today},
  })
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
});


// Dates All, renvoie realDateStart, realDateEnd et 

router.get('/date/all', function (req, res,next) {
  Event.
  find({})
  .sort({'evenements.realDateStart': 'ascending'})
  .exec(function (err, events) {
    if (err) {
      console.log('An error occurred' + err);
    } else {    
      console.log(events.length);
      var eventsDates=[];
      for (var i = 0;i<events.length;i++){
        var eventDate = {};
        eventDate.realDateStart = events[i].evenements.realDateStart;
        eventDate.realDateEnd = events[i].evenements.realDateEnd;
        eventDate.title = events[i].title;
        eventsDates.push(eventDate);
      }
      console.log(eventsDates);
      res.json({
        events: eventsDates,
        count: events.length
      }); 
    }
  });
});



// router.get('/date/filters', function (req, res,next) {
//     Event.
//   find($and:[{
//     'evenements.realDateStart': {$lte: today},
//     'evenements.realDateEnd': {$gt: today},
//   },{
//     'evenements.realDateStart': {$lte: today},
//     'evenements.realDateEnd': {$gt: today}},
//   })
//   .sort({'evenements.realDateStart': 'ascending'})
//   .exec(function (err, events) {
//     if (err) {
//       console.log('An error occurred' + err);
//     } else {    
//       console.log(events.length);
//       var eventsDates=[];
//       for (var i = 0;i<events.length;i++){
//         var eventDate = {};
//         eventDate.realDateStart = events[i].evenements.realDateStart;
//         eventDate.realDateEnd = events[i].evenements.realDateEnd;
//         eventDate.title = events[i].title;
//         eventsDates.push(eventDate);
//       }
//       console.log(eventsDates);
//       res.json({
//         events: eventsDates,
//         count: events.length
//       }); 
//     }
//   });
// });








// Paramètres reçus :
// - req.query.category obligatoire || 
// - req.query.skip || 
// - req.query.limit || 
// - req.query.dateBegin || 
// - req.query.dateEnd || 
module.exports = router;