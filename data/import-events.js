require("dotenv").config();

var uid2 = require("uid2");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, function (err) {
	if (err) {
		console.error("Could not connect to mongodb.");
	}
});

var User = require("../models/User.js");
var Event = require("../models/Event.js");

var users = require("./users.json");
var events = require("./events.json");

var albertCat = [];

function addAlbertCat(category) {
	switch (category) {
		case "Festivités":
			albertCat = [3];
			break;
		case "Expositions":
			albertCat = [5];
			break;
		case "Spectacles":
			albertCat = [
				4,
				5
			];
			break;
		case "Concerts":
			albertCat = [
				3,
				4
			];
			break;
		case "Animations":
			albertCat = [
				3,
				5
			];
			break;
		case "Rencontre sportive":
			albertCat = [
				3,
				5
			];
			break;
		case "Salon / Expo vente":
			albertCat[5];
			break;
		case "Festival / Cycle":
			albertCat = [
				3,
				4,
				5
			];
			break;
		case "Fête de quartier":
			albertCat = [5];
			break;
		case "Brocante / Vide-Grenier":
			albertCat = [6];
			break;
		case "Soirée / Bal":
			albertCat = [
				2,
				3,
				4
			];
			break;
		case "Evénement Ville":
			albertCat = [
				3,
				5
			];
			break;
		case "Photographie":
			albertCat = [5];
			break;
		case "Beaux-Arts":
			albertCat = [5];
			break;
		case "Art Contemporain":
			albertCat = [5];
			break;
		case "Design / Mode":
			albertCat = [6];
			break;
		case "Histoire / Civilisations":
			albertCat = [5];
			break;
		case "Sciences / Techniques":
			albertCat = [5];
			break;
		case "Théâtre":
			albertCat = [5];
			break;
		case "Humour":
			albertCat = [5];
			break;
		case "Danse":
			albertCat = [3];
			break;
		case "Projection":
			albertCat = [5];
			break;
		case "Cirque / Art de la Rue":
			albertCat = [5];
			break;
		case "Classique":
			albertCat = [4];
			break;
		case "Rock":
			albertCat = [4];
			break;
		case "Jazz":
			albertCat = [4];
			break;
		case "Acoustique":
			albertCat = [4];
			break;
		case "Electronique":
			albertCat = [4];
			break;
		case "World":
			albertCat = [4];
			break;
		case "Hip-Hop":
			albertCat = [4];
			break;
		case "Variétés":
			albertCat = [4];
			break;
		case "Atelier / Cours":
			albertCat = [
				5,
				7
			];
			break;
		case "Conférence / Débat":
			albertCat = [5];
			break;
		case "Visite / Promenade":
			albertCat = [
				5,
				7
			];
			break;
		case "Loisirs / Jeux":
			albertCat = [3];
			break;
		case "Lecture / Rencontre":
			albertCat = [5];
			break;
		default:
			albertCat = [];
	}
	return albertCat;
}

let ids = [];

// users
for (var i = 0; i < users.length; i++) {
  User.register(
    new User({
      shortId: users[i].id,
      email: users[i].account.username.toLowerCase() + "@albert.com",
      token: uid2(16),
      account: {
        username: users[i].account.username,
        favorites:users[i].account.favorites,
      }
    }),
    "password01", // Le mot de passe doit être obligatoirement le deuxième paramètre transmis à `register` afin d'être crypté
    function(err, obj) {
      if (err) {
        console.error(err);
      } else {
        console.log("saved user " + obj.account.username);
      }
    }
  );
}


// event_to_save rename to event

// events
events.forEach(function (event_to_save) {

	if (ids.indexOf(event_to_save.id) === -1) {
		ids.push(event_to_save.id);

		event_to_save.evenements.realDateStart = new Date(event_to_save.evenements.realDateStart);
		event_to_save.evenements.realDateEnd = new Date(event_to_save.evenements.realDateEnd);

		event_to_save.contact.phone = event_to_save.contact.phone === null ? null : String(event_to_save.contact.phone);
		event_to_save.modality.accessPhone = event_to_save.modality.accessPhone === null ? null : String(event_to_save.modality.accessPhone);

		event_to_save.evenements.periodes.map(function (periode) {
			periode.dateStart = new Date(periode.dateStart);
			periode.dateEnd = new Date(periode.dateEnd);
		});

		var data = new Event({
			"shortId": uid2(16),
			"idProvider": event_to_save.id,
			"providerName": "Quefaire",
			"type": event_to_save.type,
			"albertCat": addAlbertCat(event_to_save.evenements.category.lvl0),
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
			"contact.phone": String(event_to_save.contact.phone),
			"evenements": event_to_save.evenements
		});
		var event = new Event(data);
		event.save(function (err,
		obj) {
			if (err) {
				console.log("error saving event");
			} else {
				//console.log("saved event");
			}
		});
	} else {
		console.log('doublon');
	}
});

setTimeout(
  function() {
    mongoose.connection.close();
  },
  8000
);
