export default Ember.Component.extend({

	time: null,

	_initTimePicker: function() {

		var timepicker = this.$('.timepicker').timepicker({
			showSeconds: false,
			showMeridian: false,
			defaultTime: this.get('time')
		});

		timepicker.on('changeTime.timepicker', function(e) {
			this.set('time', e.time);
		}.bind(this))
	}.on('didInsertElement'),

	//time: function() {
	//	console.log("returning...");
	//	console.log(this.get('momentDateTime'));
	//	return this.get('momentDateTime').format('HH:mm');
	//}.property('momentDateTime')

});