export default Ember.ArrayController.extend({
	needs: ['calendar'],


	currentClient: {},

	actions: {
		'close': function() {
			this.transitionToRoute('calendar');
		},
		'saveClient': function() {
			var client = this.get('currentClient');

			//TODO: just hide if no info has been added

			if (client.id) {
				console.log("update client");
			} else {
				console.log("creating new client");
				client = this.store.createRecord('client', client);
				this.set('currentClient', client); 					// update now client has an id!
			}
			this.send('clientSelected', client);
			this.transitionToRoute('calendar');
		},
	}

});