import CalendarEntry from "../models/calendarEntry.js";

export default Ember.View.extend({
	templateName: 'calendar-instructor-week',
	weekStart: 1000,
	weekEnd: 1200,


	entries: function() {
		var timeslots = [];
		var timePeriod  = 50; // 12 hours (AM->PM)

		for (var x=this.get('weekStart'); x < this.get('weekEnd'); x+=timePeriod) {
			var event = this.getEventForTime(x, x+timePeriod);
			timeslots.push( event );
			//console.log("here");
		}

		return timeslots
	}.property(),

	getEventForTime: function(startTime, endTime) {
		var self = this;
		var events = this.get('controller.events');
		var current_instructor = self.get('instructor');
		//console.log( events );
		console.log( self.get('instructor'));


		var timeslotEvent = events.filter(function(event) {
			// must be our instructor

			if ( event.instructor != current_instructor.id) {
				console.log( event.instructor);
				console.log("bad times");
				console.log( current_instructor.id);
				return false;
			}

			if (event.start_time > startTime && event.start_time <= endTime) {
				return true;
			}

			// todo - it can also end in the afternoon

			return false;
		})[0]; //what if there are two events within the same timeslot.

		if (! timeslotEvent) {
			return CalendarEntry.create({});
		}

		return CalendarEntry.create({eventType: timeslotEvent.type});
	}
});