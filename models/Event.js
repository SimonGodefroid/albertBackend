var mongoose = require("mongoose");
// Le package `mongoose-simple-random` permet de récupérer aléatoirement des documents dans une collection
// var random = require("mongoose-simple-random");

var EventSchema = new mongoose.Schema({
  "shortId": Number,
  "idProvider":Number,
  "providerName":String,
  "id": Number,
  "type": Number,
  "title": String,
  "leadText":String,
  "components": [Object],
  "image": {
    "url": String,
    "credit": String,
    "alt": String
    },
    "tags": [
      String
    ],
    "place": {
      "address": String,
      "zipCode": Number,
      "city": String,
      "lat": Number,
      "lon": Number,
      "metro": String,
      "name": String
    },
      "modality": {
        "priceType": String,
        "priceDetail": String,
        "accessType": String,
        "accessLink": String,
        "accessPhone": String,
        "accessMail": String
      },
      "contact": {
        "phone": Number,
        "mail": String,
        "facebook": String,
        "twitter": String,
        "name": String,
        "url": String
      },
      "evenements": {
        "realDateStart": String,
        "realDateEnd": String,
      "category": {
        "lvl0": String,
        "lvl1": String
      },
      "periodes": [Object],
      "fermetures": [],
    }
});

module.exports = mongoose.model("Event", EventSchema, "events");