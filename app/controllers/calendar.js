import Ember from "ember";

export default Ember.ArrayController.extend({
	//needs: ['instructors', 'lessons'],
	queryParams: {
		weekStartQP: "week_start"
	},

	instructors: function() {
		return this.store.find('instructor');
	}.property(),

	week_start: function() {
		return  this.get('weekStartQP') ? moment(this.get('weekStartQP')) : moment().startOf('week');
	}.property('weekStartQP'),

	weekStartQP: null,

	lessons: undefined,

	timePeriods: function() {
		return this.generateTimePeriodsForWeek(this.get('week_start'));
	}.property('week_start'),

	current_client: undefined,

	currentClientName: function() {
		var client = this.get('current_client');
		if (! client) {
			return "";
		}
		return client.get('fullName');
	}.property('current_client'),


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
		},
		showEditLessonForm: function(lesson) {
			this.transitionToRoute('calendar.edit-lesson', lesson);
		},
		showLessonInfo: function(lesson) {
			this.transitionToRoute('calendar.info', lesson );
		}
	},

	generateTimePeriodsForWeek: function(weekStart) {
		var dayStart = 8;
		var dayEnd = 17;
		var calendarDisplayPeriod = moment.duration(1, "hour" );
		var currentTimePeriodStart = weekStart.clone().add(dayStart, 'hours');
		var workingWeekEnd = weekStart.clone().add(7, 'days');

		var timePeriods = [];

		while (currentTimePeriodStart.isBefore( workingWeekEnd)) {
			var currentTimePeriodEnd = currentTimePeriodStart.clone().add( calendarDisplayPeriod );

			timePeriods.push( {
				start_time: currentTimePeriodStart.clone(),
				end_time: currentTimePeriodEnd
			});

			currentTimePeriodStart.add( calendarDisplayPeriod  );

			// we need to skip from today to tomorrow
			if (currentTimePeriodStart.hours() >= dayEnd) {
				currentTimePeriodStart.add(1, "day").hours( dayStart );
			}
		}

		return timePeriods;
	}


});