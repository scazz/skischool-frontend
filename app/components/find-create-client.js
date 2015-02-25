export default Ember.Component.extend({

	searchQuery: null,

	currentClient: {},

	existingClientSelected: function() {
		return this.get('currentClient').id;
	}.property('currentClient'),

	updateSearchQuery: function() {
		var query = this.get('searchQuery');
		this.sendAction('search', query);
	}.observes('searchQuery'),

	actions: {
		selectClient: function(client) {
			this.set('currentClient', client);
		},
		unselectClient: function() {
			this.set('currentClient', {});
		}
	}



});