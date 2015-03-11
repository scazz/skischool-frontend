import Ember from "ember";

export default Ember.ObjectController.extend({
	needs: ['calendar'],

	actions: {
		deselectClient: function() {
			this.send('unsetCurrentClient');
			this.transitionToRoute('clients');
		},

		updateClient: function() {
			var client = this.get('model');

			console.log("TODO: update client here");
			console.log(client);
			this.transitionToRoute('calendar');
		}
	}
});