import CalendarEvent from "../../models/calendar-event.js"

export default Ember.Route.extend({
	//controllerName: 'calendar-event',

	model: function(params) {
		//return this.store.find("calendar-event", params.id);
		return this.store.find('lesson', params.id)
	},

});