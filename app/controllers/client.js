export default Ember.ObjectController.extend({
	actions: {
		deselectClient: function() {
			this.transitionToRoute('clients');
		}
	}
})