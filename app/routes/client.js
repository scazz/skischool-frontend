export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('client',params.client_id);
	},

	setupController: function(controller, model) {
		controller.set('model', model);
		model = controller.get('model');

		this.store.find('enrollment')
			.then(function() {
				return this.store.filter('enrollment', function(enrollment) {
					return (enrollment.get('client').get('id') == model.get('id'));
			}.bind(this))
			.then(function(clientHistory) {
				controller.set('client_enrollments', clientHistory)
			});
		}.bind(this));
	}
});
