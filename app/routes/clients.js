export default Ember.Route.extend({
	controllerName: 'clients',

	model: function() {
		return this.store.find('client');
	},

	setupController: function(controller) {
		console.log("fired");
		controller.set('currentClient', {});
	}
});
