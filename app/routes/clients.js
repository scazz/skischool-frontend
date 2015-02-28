export default Ember.Route.extend({
	controllerName: 'clients',

	model: function() {
		return this.store.find('client');
	}
});
