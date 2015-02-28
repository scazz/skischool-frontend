import Ember from "ember";
import CalendarEvent from "../models/calendar-event.js";

export default Ember.ArrayController.extend({
	//needs: ['instructors', 'lessons'],

	instructors: function() {
		return this.store.find('instructor');
	}.property(),

	lessons: undefined,

	timePeriods: undefined,

	current_client: undefined,

	currentClientName: function() {
		var client = this.get('current_client');
		if (! client) {
			return "";
		}
		return client.get('fullName');
	}.property('current_client'),

	createCalendarTimePeriod: function(instructor, start_time, end_time) {
		var timePeriod = this.store.createRecord('calendar-event', {
			instructor: instructor,
			start_time: start_time,
			end_time: end_time
		});
		return timePeriod;
	},

	createEmptyEvent: function(start_time, end_time) {
		return this.store.createRecord('calendar-event', {
			start_time: start_time,
			end_time: end_time
		});
	},

	actions: {
		showNewLessonForm: function(template) {
			this.transitionToRoute('calendar.new-lesson', template);
			console.log("I got this!");
		},
		clientSelected: function(client) {
			this.set('current_client', client);
		}
	}

});