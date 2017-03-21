var mongoose = require("mongoose");
// Le package `mongoose-simple-random` permet de récupérer aléatoirement des documents dans une collection
// var random = require("mongoose-simple-random");

var Events = new mongoose.Schema({
  "shortId": Number,
  "idProvider":Number,
  "providerName":String,
  "id": Number, // id de l'event dans la base de 
  "type": Number,
  "title": String,
  "leadText":String,
  "components": [
    {
      "type": "text",
      "data": {
        "block": String
      }
    },
  ],
  "html": String,
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
      "periodes": [
        {
          "idEvenementsPeriodes": Number,
          "dateStart": String,
          "dateEnd": String,
          "seances": [
            {
              "idEvenementsPeriodes": Number,
              "hourStart": String,
              "hourEnd": String,
              "weekDays": String,
              "timeRange": String
            },
          ]
        }
      ],
      "fermetures": []
    }
});

module.exports = mongoose.model("Event", EventSchema, "events");