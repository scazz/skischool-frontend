export default Ember.ArrayController.extend({
	needs: ['calendar'],

	filteredClients: null,

	currentClient: {},

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
			return true; // let action bubble to set on the calendar
		},

		addClient: function() {
			var client = this.get('currentClient');
			console.log("creating new client");
			client = this.store.createRecord('client', client);
			this.set('currentClient', client); 					// update now client has an id!

			this.get('controllers.calendar').send('clientSelected', client);
			this.transitionToRoute('calendar');
		}
	}
});