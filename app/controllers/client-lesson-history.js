export default Ember.ObjectController.extend({
	pastEnrollments: function() {
		console.log("yolo");

		//console.log(this.store.find('enrollment'));

		//this.store.filter('enrollment', function() {
		//	console.log("here");
		//});
		return this.store.find('enrollment').then( function(enrollments) {
			console.log(enrollments);
			return enrollments.filter(function(enrollment) {
				return enrollment.client = this.get('model')
			}.bind(this));
		}.bind(this));

		return this.store.filter('enrollment', function(enrollment) {
			console.log( enrollment.client );
			return enrollment.client = this.get('model');
		}.bind(this));
	}.property('model'),
})