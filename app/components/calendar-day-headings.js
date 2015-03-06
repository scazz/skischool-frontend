export default Ember.Component.extend({

	weekStart: moment().startOf('week'),

	daysInWeek: function() {
		var weekStart = this.get('weekStart');
		var weekEnd = weekStart.clone().endOf('week');
		var today = weekStart.clone();

		var days = [];

		while( today.isBefore ( weekEnd )) {
			days.push( today.format('dddd'));
			today.add(1, 'day');
		}

		return days;
	}.property('weekStart')


})