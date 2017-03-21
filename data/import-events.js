require("dotenv").config();

var uid2 = require("uid2");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, function (err) {
	if (err) {
		console.error("Could not connect to mongodb.");
	}
});

// var User = require("../models/User.js");
var Event = require("../models/Event.js");

// var users = require("./users.json");
var events = require("./events.json");

// events
events.forEach(function (event_to_save) {
	var data = new Event({
		"shortId": uid2(16),
		"idProvider": event_to_save.id,
		"providerName": "Quefaire",
		"type": event_to_save.type,
		"title": event_to_save.title, //ok
		"leadText": event_to_save.leadText, //ok
		"components": event_to_save.components,
		"image": event_to_save.image,
		"tags": event_to_save.tags,
		"place": {
			"address": event_to_save.place.address,
			"zipCode": event_to_save.place.zipCode,
			"city": event_to_save.place.city,
			"lat": event_to_save.place.lat,
			"lon": event_to_save.place.lon,
			"metro": event_to_save.place.metro,
			"name": event_to_save.place.name
		},
		"modality": event_to_save.modality,
		"contact": event_to_save.contact,
		"evenements": {
			"realDateStart": event_to_save.evenements.realDateStart,
			"realDateEnd": event_to_save.evenements.realDateEnd,
			"category": event_to_save.evenements.category,
			"periodes": event_to_save.evenements.periodes,
			"fermetures": event_to_save.evenements.fermetures
		}
	});
	var event = new Event(data);
	event.save(function (err,
	obj) {
		if (err) {
			console.log("error saving event");
		} else {
			console.log("saved event");
		}
	});
})
