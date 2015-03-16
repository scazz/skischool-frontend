import Ember from 'ember';

export default Ember.ObjectController.extend({

	needs: ['calendar'],

	queryParams: ['instructor_id', 'client_id', {startingDateTimeStr: 'time'}],
	//instructor: null,
	instructor_id: null,
	client_id: null,
	startingDateTimeStr: null,			//query param - human readable, used to set startingDateTime on controller setup
//	startingDateTime: null,				//internal state. date() and time() used to get/set. startTime used to get

	lessonType: null,
	lessonTypes: [],

	client: {},
	clients: null,			//TODO: currently we pass *every* client into find-clients component. The search should be handled on the server.

	duration: function() {
		// TODO: this should just be a promise
		return this.get('durations') ? this.get('durations').content[0] : null ;
	}.property('durations'),
	instructors: null,

	durations: null,


	pupilFilter: function() {

		this.store.find('pupil').then( function(pupils) {
			return pupils.filter( function() {
				return true;
			});
		}).then(function(pupils) {
			this.set('pupils', pupils);
		}.bind(this));

	}.observes('client'),

	pupils: null,
	pupil: {},
	enrolled_pupils: Ember.A([]),


	startTime: function() {
		return moment(this.get('model.start_time')).clone();
	}.property('model.start_time'),

	date: function(key, value) {
		// setter
		if (arguments.length > 1) {
			var newDate = moment(value);
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
		clientSelected: function(client) {
			this.set('client', client);
		},
		addPupil: function() {
			var pupil = this.get('pupil');
			this.get('enrolled_pupils').pushObject( pupil );
			this.set('pupil', {});
		},
		save: function() {
			var newLesson = this.store.createRecord('lesson', {
				instructor: this.get('instructor'),
				start_time: this.get('startTime'),
				end_time: this.get('startTime').clone().add( this.get('duration').get('hours'), 'hours'),
				type: 'group'
			});
			newLesson.save();

			var client = this.get('client');
			if (! client.id) {
				client = this.store.createRecord('client', client);
				client.save();
			}

			var pupils = this.get('enrolled_pupils');
			pupils.pushObject( this.get('pupil'));

			pupils.forEach(function(pupil) {
				if (! pupil.id) {
					pupil = this.store.createRecord('pupil', pupil);

					pupil.save().then( function() {
						var enrollment = this.store.createRecord('enrollment', {
							lesson: newLesson,
							client: client,
							pupil: pupil
						});
						enrollment.save();
					}.bind(this));
				}


			}.bind(this));




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

				this.transitionToRoute('calendar');
			}.bind(this));

		}
	}
});