const router = require("express").Router();
const Hotel = require("../models").Hotel;
const Restaurant = require("../models").Restaurant;
const Activity = require("../models").Activity;
const Itinerary = require("../models").Itinerary;
const db = require("../models").db;

router.get('/itineraries/:id', (req, res, next) => {
  Itinerary.findById(req.params.id, {
    include: [{all: true, nested: true}]
  })
  .then(foundItineraries => res.json(foundItineraries))
  .catch(next);
})


router.get("/", (req, res, next) => {
  Promise.all([
    Hotel.findAll({ include: [{ all: true }] }),
    Restaurant.findAll({ include: [{ all: true }] }),
    Activity.findAll({ include: [{ all: true }] })
  ])
    .then(([hotels, restaurants, activities]) => {
      res.json({
        hotels,
        restaurants,
        activities
      });
    })
    .catch(next);
});

router.post('/itineraries', (req, res, next) => {
    const itineraryId = req.body.pop();
    
    req.body.forEach((itineraryItem) => {
      let tableName,
      type;
      switch(itineraryItem.category) {
        case 'hotels': 
        tableName = db.models.itinerary_hotel;
        type = {itineraryId: itineraryId, hotelId: itineraryItem.id}
        break;
        case 'restaurants':
        tableName = db.models.itinerary_restaurant;
        type = {itineraryId: itineraryId, restaurantId: itineraryItem.id}
        break;
        case 'activities':
        tableName = db.models.itinerary_activity;
        type = {itineraryId: itineraryId, activityId: itineraryItem.id}
      }
      console.log(tableName)
      Itinerary.findOrCreate({
        where: {
          id: itineraryId
        }
      }).then(() => {
        tableName.findOrCreate({
          where: type
        })
      })
      
    })
});

module.exports = router;
