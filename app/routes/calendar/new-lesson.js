export default Ember.Route.extend({

	setupController: function(controller,model) {
		this._super(controller,model);

		this.store.find('instructor').then( function(instructors) {
			controller.set('instructors', instructors);
		});

		if ( controller.get('instructor_id')) {
			this.store.find('instructor', controller.get('instructor_id')).then( function(instructor) {
				controller.set('instructor', instructor);
			});
		}
	}
});