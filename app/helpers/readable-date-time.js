import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper( function(date) {
	// the date that we get from the model isn't really a moment date - create a brand new one!
	date = moment( date._d);
	return date.format('D/M/YY H:mm');
});