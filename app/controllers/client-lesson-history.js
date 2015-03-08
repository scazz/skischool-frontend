export default Ember.ObjectController.extend({
	pastEnrollments: function() {

		return this.store.find('enrollment').then( function(enrollments) {
			console.log(enrollments);
			return enrollments.filter(function(enrollment) {
				return enrollment.client = this.get('model')
			}.bind(this));
		}.bind(this));
	}.property('model'),
})