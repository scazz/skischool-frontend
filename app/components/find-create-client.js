import Ember from "ember";

export default Ember.Component.extend({

	searchQuery: null,

	currentClient: {},

	clientSelectedAction: 'clientSelected',

	filteredClients: null,

	clients: null,

	onSearchQueryChange: function() {
		Ember.run.debounce(this, this.search, 500);
	}.observes('searchQuery'),

	search: function() {
		var query = this.get('searchQuery');

		if (!query) {
			this.set('filteredClients', null);
			return;
		}
		var regex = new RegExp(query, 'i');
		var filteredClients = this.get('clients').filter(function(client) {
			return client.get('name').match(regex);
		});
		this.set('filteredClients', filteredClients);
	},

	actions: {
		selectClient: function(client) {
			this.set('currentClient', client);
			this.sendAction('clientSelectedAction', client);

		}
	}



});