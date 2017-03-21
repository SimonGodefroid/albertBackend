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


// Paramètres reçus :
// - req.query.city obligatoire || 
// - req.query.skip || 
// - req.query.limit || 
// - req.query.priceMin || 
// - req.query.priceMax || 



module.exports = router;