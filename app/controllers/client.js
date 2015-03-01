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

			this.get('controllers.calendar').send('clientSelected', client);
			this.transitionToRoute('calendar');
		}
	}
})