import DS from "ember-data";

var calendarEvent = DS.Model.extend({
	start_time: DS.attr(),
	end_time: DS.attr(),
});


calendarEvent.reopenClass({
	FIXTURES: [
	]
});

export default calendarEvent;