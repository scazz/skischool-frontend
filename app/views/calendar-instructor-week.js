import Ember from "ember";
import CalendarEntry from "../models/calendarEntry.js";
import TimePeriod from "../models/timePeriod.js";


export default Ember.View.extend({
	templateName: 'calendar-instructor-week',
	workingWeekStart: function() {
		var weekStart = moment().startOf('week');
		var workingWeekStart = weekStart.add( this.get('dayStart'), 'hours');
		return workingWeekStart;
	}.property(),
	workingWeekEnd: moment().endOf('week'),
	calendarDisplayPeriod: moment.duration(1, "hour" ),

	dayStart: 8,
	dayEnd: 17,

	timePeriods: function() {
		var timeperiods = [];
		var calendarDisplayPeriod = this.get('calendarDisplayPeriod');

		var currentTimePeriodStart = this.get('workingWeekStart');

		while (currentTimePeriodStart.isBefore( this.get('workingWeekEnd'))) {
			var currentTimePeriodEnd = currentTimePeriodStart.clone().add( calendarDisplayPeriod );
			var timePeriod = TimePeriod.create({
				start: currentTimePeriodStart.clone(),
				end: currentTimePeriodEnd.clone()
			});
			timeperiods.push(timePeriod);

			currentTimePeriodStart.add( calendarDisplayPeriod  );

			// we need to skip from today to tomorrow
			if (currentTimePeriodStart.hours() > this.get('dayEnd')) {
				currentTimePeriodStart.add(1, "day").hours( this.get('dayStart'));
			}
		}
		return timeperiods;
	}.property(),


	entries: function() {
		var calendarEntries = [];

		var timePeriods = this.get('timePeriods');
		for(var i=0; i<timePeriods.length; i++) {
			var event = this.getEventForTimePeriod( timePeriods[i]);
			calendarEntries.push(event);
		}
		return calendarEntries;
	}.property('weekStart', 'weekEnd', 'timePeriod'),

	getEventForTimePeriod: function(timePeriod) {
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

			if ( event.start_time.isBetween(timePeriod.start, timePeriod.end) ) {
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