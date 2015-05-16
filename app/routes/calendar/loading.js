import Ember from "ember";

export default Ember.Route.extend({
	//controllerName: 'calendar-event',

	model: function(params) {
		//return this.store.find("calendar-event", params.id);
		console.log("i was loaded");
	}

});