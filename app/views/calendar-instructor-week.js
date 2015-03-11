import Ember from "ember";

export default Ember.View.extend({
	templateName: 'calendar-instructor-week',


	createEvent: function() {
		this.store.createRecord();
	},

	entries: function() {
		var calendarEntries = [];

		var timePeriods = this.get('controller.timePeriods');
		//console.log(timePeriods);

		for(var i=0; i<timePeriods.length; i++) {
			var event =this.getEventForTimePeriod(timePeriods[i]);
			calendarEntries.push(event);
		}
		return calendarEntries;
	}.property('controller.lessons'),

	getEventForTimePeriod: function(timePeriod) {
		var self = this;
		var events = this.get('controller.lessons');

		var current_instructor = self.get('instructor');
		var timeSpan = timePeriod;


		var lesson = events.filter(function (event) {
			// must be our instructor
			if (event.get('instructor').get('id') !== current_instructor.get('id')) {
				return false;
			}
			return self.eventFallsOnTimePeriod(event, timeSpan);
		})[0];

		var calendarEvent = self.get('controller').createCalendarTimePeriod(current_instructor, timeSpan.start_time, timeSpan.end_time);

		if (lesson) {
			calendarEvent.lesson = lesson;
		}

		return calendarEvent;

	},

	eventFallsOnTimePeriod: function (event, timePeriod) {

		// event(8:00 - 12:00) timePeriod(8:00 - 9:00)
		if ( moment(event.get('start_time')).isSame(timePeriod.start_time)) {
			return true;
		}
		// event(8:30, 9) timeperiod(8:00,9:00)
		if ( moment(event.get('start_time')).isBetween(timePeriod.start_time, timePeriod.end_time)) {
			return true;
		}
		//event 8:00-12:00 time 9:00-10:00
		return timePeriod.start_time.isBetween(moment(event.get('start_time')), moment(event.get('end_time')));

		//event(
	}
});