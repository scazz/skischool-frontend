export default Ember.ArrayController.extend({
	filteredClients: null,

	actions: {
		filterClients: function(query) {
			if (!query) {
				this.set('filteredClients', null);
				return;
			}
			var regex = new RegExp(query, 'i');
			var filteredClients = this.get('model').filter(function(client) {
				return client.get('name').match(regex);
			});
			this.set('filteredClients', filteredClients);
		},
		clientSelected: function(client) {
			this.transitionToRoute('client',client);
		}
	}
});