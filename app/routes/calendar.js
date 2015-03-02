export default Ember.Route.extend({

	model: function() {
	},

	setupController: function(controller, model) {
		controller.set('model', model);
		controller.set('lessons', this.store.find('lesson'));
		//controller.set('')
		controller.set('timePeriods', this.generateTimePeriodsForWeek());
	},

	actions: {
		unsetCurrentClient: function() {
			this.controller.set('current_client', null);
		},
		clientSelected: function(client) {
			this.controller.set('current_client', client);
		}
	},

	generateTimePeriodsForWeek: function() {
		var dayStart = 8;
		var dayEnd = 17;
		var calendarDisplayPeriod = moment.duration(1, "hour" );
		var weekStart = moment().startOf('week');
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
			if (currentTimePeriodStart.hours() > dayEnd) {
				currentTimePeriodStart.add(1, "day").hours( dayStart );
			}
		}

		return timePeriods;
	}

});