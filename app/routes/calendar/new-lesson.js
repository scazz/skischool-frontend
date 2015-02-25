export default Ember.Route.extend({

	model: function(params) {
		return this.store.find("calendar-event", params.base_event_id);
	},

});