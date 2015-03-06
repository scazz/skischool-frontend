export default Ember.Route.extend({

	model: function() {
	},

	setupController: function(controller, model) {
		controller.set('model', model);
		controller.set('lessons', this.store.find('lesson'));
		//controller.set('')
		var weekStart = controller.get('week_start');
		controller.set('timePeriods', this.generateTimePeriodsForWeek(weekStart));
	},

	actions: {
		unsetCurrentClient: function() {
			this.controller.set('current_client', null);
		},
		clientSelected: function(client) {
			this.controller.set('current_client', client);
		}
	},

	generateTimePeriodsForWeek: function(weekStart) {
		var dayStart = 8;
		var dayEnd = 17;
		var calendarDisplayPeriod = moment.duration(1, "hour" );
		var currentTimePeriodStart = weekStart.clone().add(dayStart, 'hours');
		var workingWeekEnd = moment().endOf('week');

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