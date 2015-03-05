export default Ember.Component.extend({

	momentDateTime: null,

	_initTimePicker: function() {
		var timepicker = this.$('.timepicker').timepicker({
			showSeconds: false,
			showMeridian: false,
			defaultTime: this.get('time')
		});

		timepicker.on('changeTime.timepicker', function(e) {
			var momentDateTime = this.get('momentDateTime');
			momentDateTime.hours( e.time.hours);
			momentDateTime.minutes( e.time.minutes );
			this.set('momentDateTime', momentDateTime);
		}.bind(this))
	}.on('didInsertElement'),

	time: function() {
		console.log("returning...");
		console.log(this.get('momentDateTime'));
		return this.get('momentDateTime').format('HH:mm');
	}.property('momentDateTime')

});