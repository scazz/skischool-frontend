export default Ember.ObjectController.extend({

	needs: ['calendar'],

	queryParams: ['instructor_id', 'start_time'],
	instructor: null,
	instructor_id: null,
	start_time: null,
	duration: null,
	instructors: null,

	durations: function() {
		return this.store.find('lesson-durations');
	}.property(),

	//instructors: function() {
	//	return this.store.find('instructor').then(function(instructorPromise) {
	//		console.log(instructorPromise);
	//		console.log(instructorPromise.content);
	//		return instructorPromise.content;
	//	});
	//}.property(),

	startTime: function() {
		return moment(this.get('start_time'));
	}.property('start_time'),

	date: function() {
		return moment(this.get('start_time')).toDate();
	}.property('start_time'),



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
				if (event.instructor.id != newLesson.get('instructor').get('id')) {
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