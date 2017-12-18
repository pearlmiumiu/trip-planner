const fetchAttractions = () =>
  fetch("/api")
    .then(result => result.json())
    .catch(err => console.error(err));

const fetchItinerary=(hash)=>
		fetch('/api/itineraries/'+hash)
		.then(result=>result.json())


module.exports = {
  fetchAttractions,
  fetchItinerary

};
