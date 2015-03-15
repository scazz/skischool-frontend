import Ember from "ember";

export default Ember.Route.extend({

	setupController: function(controller,model) {
		this._super(controller,model);

		controller.set('lessonTypes', [
			{
				id: 1,
				type: "Group"
			},
			{
				id: 2,
				type: "Private"
			}
		]);

		controller.set('enrolled_pupils', Ember.A([]));
		controller.set('pupil', {});


		controller.set('startingDateTime', moment(controller.get('startingDateTimeStr')));

		this.store.find('lesson-duration').then( function(durations) {
			controller.set('durations', durations);
		});

		this.store.find('instructor').then( function(instructors) {
			controller.set('instructors', instructors);
		});

		if ( controller.get('instructor_id')) {
			this.store.find('instructor', controller.get('instructor_id')).then( function(instructor) {
				controller.set('instructor', instructor);
			});
		}

		if ( controller.get('client_id')) {
			this.store.find('client', controller.get('client_id')).then(function(client) {
				controller.set('client', client);
			});
		} else {
			controller.set('client', {});
		}

		this.store.find('client').then(function(clients) {
			controller.set('clients', clients);
		});
	}
});