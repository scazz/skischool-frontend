import Ember from "ember";

export default Ember.ArrayController.extend({
	//needs: ['instructors', 'lessons'],

	instructors: function() {
		return this.store.find('instructor');
	}.property(),

	week_start: function() {
		return  moment().startOf('week');
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
			this.transitionToRoute('calendar.new-lesson',
				{queryParams:
					{
						startingDateTimeStr: template.get('start_time').format('YYYY-MM-DD HH:mm'),
						instructor_id: template.get('instructor').get('id'),
						client_id: this.get('current_client') ? this.get('current_client').id : null
					}
				}
			);
			console.log("I got this!");
		},
		showEditLessonForm: function(lesson) {
			console.log("caught");
			this.transitionToRoute('calendar.edit-lesson', lesson);
		},
		showLessonInfo: function(lesson) {
			this.transitionToRoute('calendar.info', lesson );
		}
	}

});