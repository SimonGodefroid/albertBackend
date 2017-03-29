var express = require("express");
var router = express.Router();
var Event = require("../models/Event.js");
var request = require('request');


// getDateFn
function getDateFn(day){
  var currentTime = new Date();
  var todayDate = new Date( Date.UTC (currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate()+day));
  return todayDate;
}

// PROD
// Route pour tous les events d'une catégorie
// http://localhost:3002/api/events/?category=5

router.get('/',
  function(req,res,next){
    if(!req.query.category){
      return next("Category is mandatory");
    }
    var today = getDateFn(0);
    Event.find({
      $and: [
          {albertCat: { $in: [parseInt(req.query.category)]}},
          {'$or':[
            {
              'evenements.realDateStart': {$lte: today},
              'evenements.realDateEnd': {$gt: today},
            },
            {
              'evenements.realDateStart': {$gte: today},
            }
            ]
          }
      ]
    })
    .sort({'evenements.realDateStart': 'ascending'})
    .exec(function (err, events) {
      if (err) {
        console.log('An error occurred' + err);
      } else {
        res.json({
          category:req.query.category,
          total: events.length,
          events:events,
        });
      }
    });
  });


// DEV
// Route pour tous les events
// http://localhost:3002/api/events/all

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

router.get('/date', function (req, res,next) {
  var today = getDateFn(0);
  Event.
  find({
    '$or':[{
      'evenements.realDateStart': {$lte: today},
      'evenements.realDateEnd': {$gt: today},
    },{
      'evenements.realDateStart': {$gte: today},
    }]
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




router.get('/dates',
  function(req,res,next){
    var today = getDateFn(0);
    var tomorrow = getDateFn(1);
    Event.find({
      $and: 
        [{albertCat: { $in: [parseInt(req.query.category)]}},
        {'$or':
          [{
            'evenements.realDateStart': {$lte: today},
            'evenements.realDateEnd': {$gt: today},
        }]
      }]
    })
    .sort({'evenements.realDateStart': 'ascending'})
    .exec(function (err, eventsInProgress) {
      if (err) {
        console.log('An error occurred' + err);
      } else {
        Event.find({
          'evenements.realDateStart': {$gt: today}
        })
        .sort({'evenements.realDateStart': 'ascending'})
        .exec(function (err, eventsComing) {
          if (err) {
            console.log('An error occurred' + err);
          } else {
            Event.find({
              $and: [{
                'evenements.realDateStart':today,
              }]
            })
            .sort({'evenements.realDateStart': 'ascending'})
            .exec(function (err, eventsToday) {
              if (err) {
                console.log('An error occurred' + err);
              } else {
                res.json({
                  total: eventsInProgress.length + eventsToday.length + eventsComing.length,
                  eventsInProgressCount:eventsInProgress.length,
                  eventsTodayCount:eventsToday.length,
                  eventsComingCount:eventsComing.length,
                  eventsInProgress:eventsInProgress,
                  eventsToday:eventsToday,
                  eventsComing:eventsComing,
                });
              }
            });
          }
        });
      }
    });
  });

//////////////////// DEPRECATED ROUTES //////////////////////////////


// router.get('/test',function(req,res){
//   request('https://api.paris.fr/api/data/2.2/QueFaire/get_events/?token=ec30faf59bcfe1e3ff4637c1a1246e3426591d3f23ec814ec5686305cb83c158&categories=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,23,24,26,27,28,29,30,31,32,33,35,37,38&tags=&start=&end=&offset=&limit=2000',
//   function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var result = JSON.parse(body);
//       var events=[]
//       for (var i = 0; i<result.data.length;i++){
//         var event = {};
//         event.title = result.data[i].title;
//         event.id = result.data[i].id;
//         event.date = result.data[i].evenements.realDateStart;
//         event.category0 = result.data[i].evenements.category.lvl0;
//         event.category1 = result.data[i].evenements.category.lvl1;
//         events.push(event);
//       }
//     res.json({
//       count:events.length,
//       events:events,
//       // result:result.data
//     });
//     }
//   });
// });


// DEV
// Route pour tous les events de toutes les catégories avec les dates et les titres uniquement
// http://localhost:3002/api/events/date/all

// router.get('/date/all', function (req, res,next) {
//   var currentTime = new Date();
//   var today = new Date( currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate());
//   Event.
//   find({})
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
//         eventDate.idProvider = events[i].idProvider;
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


// DEV
// Route pour tous les events de toutes les catégories avec les dates et les titres uniquement
// http://localhost:3002/api/events/date/filtersdev

// router.get('/date/filtersdev',
//   function(req,res,next){
//     var today = getDateFn(0);
//     Event.find({
//       '$or':[{
//         'evenements.realDateStart': {$lte: today},
//         'evenements.realDateEnd': {$gt: today},
//       },{
//         'evenements.realDateStart': {$gte: today},
//       }]
//     })
//     .sort({'evenements.realDateStart': 'ascending'})
//     .select(['evenements.realDateStart','evenements.realDateEnd','title','idProvider'])
//     .exec(function (err, events) {
//       if (err) {
//         console.log('An error occurred' + err);
//       } else {
//         res.json({
//           events:events,
//           total: events.length
//         });
//       }
//     });
//   });

// Paramètres reçus :
// - req.query.category obligatoire ||
// - req.query.skip ||
// - req.query.limit ||
// - req.query.dateBegin ||
// - req.query.dateEnd ||
module.exports = router;
