const db = require('./_db');

const Place = require('./place');
const Hotel = require('./hotel');
const Restaurant = require('./restaurant');
const Activity = require('./activity');
const Itinerary=require('./itinerary');


Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);


module.exports = {
  db,
  Place,
  Hotel,
  Restaurant,
  Activity,
  Itinerary
};
