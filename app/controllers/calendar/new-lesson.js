export default Ember.ObjectController.extend({

	needs: ['calendar'],

	instructors: function() {
		return this.store.find('instructor');
	}.property(),

	startTime: function() {
		console.log( this.get('model'));
		return moment(this.get('start_time'));
	}.property('start_time'),

	actions: {
		close: function(){
			this.transitionToRoute('calendar');
		},
		save: function() {
			var newLesson = this.store.createRecord('lesson', {
				instructor: this.get('instructor'),
				start_time: this.get('start_time'),
				end_time: this.get('start_time').clone().add(2, 'hours')
			});

			this.store.filter('calendar-event',function(event) {
				if (event.instructor != newLesson.get('instructor')) {
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
					event.set('lesson', newLesson);
				});
			});

		}
	}
});