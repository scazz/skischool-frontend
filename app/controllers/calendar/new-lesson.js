import Ember from 'ember';

export default Ember.ObjectController.extend({

	needs: ['calendar'],

	queryParams: ['instructor_id', {startingDateTimeStr: 'time'}],
	instructor: null,
	instructor_id: null,
	startingDateTimeStr: null,			//query param - human readable, used to set startingDateTime on controller setup
	startingDateTime: null,				//internal state. date() and time() used to get/set. startTime used to get

	duration: function() {
		// TODO: this should just be a promise
		return this.get('durations') ? this.get('durations').content[0] : null ;
	}.property('durations'),
	instructors: null,

	durations: null,

	startTime: function() {
		return moment(this.get('startingDateTime')).clone();
	}.property('startingDateTime'),

	date: function(key, value) {
		// setter
		if (arguments.length > 1) {
			var newDate = moment(value);
			console.log("new date");
			console.log(newDate);

			var start_time =this.get('startTime');

			start_time.year ( newDate.year() );
			start_time.month ( newDate.month() );
			start_time.date( newDate.date() );

			this.set('startingDateTime', start_time);
		}

		return this.get('startTime').toDate();
	}.property('startTime'),

	time: function(key, value) {
		if (arguments.length > 1) {
			var time = this.get('startTime');
			time.hours(value.hours);
			time.minutes(value.minutes);
			this.set('startingDateTime', time);
		}
		return this.get('startTime').format('HH:mm');
	}.property('startTime'),

	actions: {
		close: function(){
			this.transitionToRoute('calendar');
		},
		save: function() {
			var newLesson = this.store.createRecord('lesson', {
				instructor: this.get('instructor'),
				start_time: this.get('startTime'),
				end_time: this.get('startTime').clone().add( this.get('duration').get('hours'), 'hours'),
				type: 'group'
			});

			console.log(newLesson);

			this.store.filter('calendar-event',function(event) {
				if (event.instructor.id !== newLesson.get('instructor').get('id')) {
					return false;
				}
				if (event.get('start_time').isBetween( newLesson.get('start_time'), newLesson.get('end_time') )) {
					return true;
				}
				if (event.get('start_time').isSame( newLesson.get('start_time'))) {
					return true;
				}
				return false;

			}).then(function(events){
				events.forEach(function(event) {

					console.log(event);
					event.set('lesson', newLesson);
				});
			});

		}
	}
});