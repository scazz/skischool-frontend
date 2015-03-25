import Ember from "ember";

export default Ember.Route.extend({

	controllerName: "calendar.new-lesson",

	renderTemplate: function() {
		this.render('calendar.new-lesson');
	},

	model: function(params) {
		return this.store.find('lesson', params.id);
	},

	setupController: function(controller,model) {
		this._super(controller,model);


		this.store.find('instructor').then( function(instructors) {
			controller.set('instructors', instructors);
		});

		this.store.find('lesson-duration').then( function(durations) {
			controller.set('durations', durations);
		});

		if ( model.get('isPrivate') ) {
			model.get('enrollments').then( function(enrollments) {
				var enrollment = enrollments.get('firstObject');

				if ( enrollment) {
					controller.set('client', enrollment.get('client'));
				}
			});
		}
	}
});