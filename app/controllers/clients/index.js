import Ember from "ember";

export default Ember.ArrayController.extend({
	needs: ['calendar'],

	currentClient: {},

	actions: {
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