export default Ember.Component.extend({

	time: null,

	_initTimePicker: function() {
		this.$('.timepicker').timepicker({
			showSeconds: false,
			showMeridian: false,
			defaultTime: this.getTimeFromMomentObject(this.time)
		});
	}.on('didInsertElement'),

	getTimeFromMomentObject: function(time) {
		time = moment(time);
		return time.format('HH:mm');
	}

});