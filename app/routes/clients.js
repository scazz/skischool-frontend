import Ember from "ember";

export default Ember.Route.extend({
	controllerName: 'clients',

	model: function() {
		return this.store.find('client');
	},

	setupController: function(controller) {
		controller.set('currentClient', {});
	}
});
