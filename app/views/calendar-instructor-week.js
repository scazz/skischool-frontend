import Ember from "ember";
import CalendarEntry from "../models/calendarEntry.js";


export default Ember.View.extend({
	templateName: 'calendar-instructor-week',
	weekStart: moment().startOf('week'),
	weekEnd: moment().endOf('week'),
	timePeriod: moment.duration(12, "hours" ),


	entries: function() {
		var timeslots = [];
		var timePeriod  = this.get('timePeriod'); // 12 hours (AM->PM)

		var currentTimePeriod = this.get('weekStart');

		while (currentTimePeriod.isBefore( this.get('weekEnd') )) {
			var endPeriod = currentTimePeriod.clone().add( timePeriod );

			var event = this.getEventForTime( currentTimePeriod, endPeriod );
			timeslots.push( event );
			currentTimePeriod.add( timePeriod );
		}

		return timeslots;
	}.property('weekStart', 'weekEnd', 'timePeriod'),

	getEventForTime: function(startTime, endTime) {
		var self = this;
		var events = this.get('controller.events');
		var current_instructor = self.get('instructor');

		var timeslotEvent = events.filter(function(event) {
			// must be our instructor

			if ( event.instructor !== current_instructor.id) {
				console.log( event.instructor);
				console.log("bad times");
				console.log( current_instructor.id);
				return false;
			}

			event.start_time = moment(event.start_time);
			event.end_time = moment(event.end_time);

			if ( event.start_time.isBetween(startTime, endTime) ) {
				console.log("true");
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