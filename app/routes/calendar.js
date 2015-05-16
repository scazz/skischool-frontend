import Ember from "ember";

export default Ember.Route.extend({

	x: 0,

	queryParams: {
		weekStartQP: {
			refreshModel: true
		}
	},

	model: function() {
		console.log("model function fired");
		//return [Math.random()];
	},

	setupController: function(controller, model) {
		console.log("fired");
		controller.set('model', model);
		controller.set('lessons', this.store.find('lesson'));
	},

	actions: {
		selectLesson: function(selectedLesson) {
			console.log("something");
			console.log(this.controller.get('lessons'));
			this.controller.get('lessons').forEach(function(lesson) {
				if ( lesson === selectedLesson ) {
					lesson.set('isSelected', true);
				}
				else if (lesson.isSelected) {
					lesson.set('isSelected', false);
				}
			});
		},

		unsetCurrentClient: function() {
			this.controller.set('current_client', null);
		},
		clientSelected: function(client) {
			this.controller.set('current_client', client);
		},

		viewPreviousWeek: function() {
			var previousWeek = this.controller.get('week_start').clone().subtract(7, 'days');
			this.controller.set('weekStartQP', previousWeek.format('YYYY-MM-DD'));
		},

		viewNextWeek: function() {
			var nextWeek = this.controller.get('week_start').clone().add(7, 'days');
			this.controller.set('weekStartQP', nextWeek.format('YYYY-MM-DD'));
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