export default Ember.Route.extend({
	controllerName: 'calendar.clients',

	model: function() {
		return this.store.find('client');
	}
});
