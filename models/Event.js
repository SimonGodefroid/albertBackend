var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
  "shortId": Number,
  "albertCat":Array,
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
      "contact.phone": String,
      "evenements": Object
});

module.exports = mongoose.model("Event", EventSchema, "events");