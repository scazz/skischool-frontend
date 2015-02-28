export default Ember.Component.extend({

	deselectClientAction: 'deselectClient',

	actions: {
		unselectClient: function() {
			this.sendAction('deselectClientAction');
		}
	}

});