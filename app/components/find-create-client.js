export default Ember.Component.extend({

	searchQuery: null,

	currentClient: {},

	clientSelectedAction: 'clientSelected',

	//existingClientSelected: function() {
	//	return this.get('currentClient').id;
	//}.property('currentClient'),

	onSearchQueryChange: function() {
		Ember.run.debounce(this, this.updateSearchQuery, 500);
	}.observes('searchQuery'),

	updateSearchQuery: function() {
		var query = this.get('searchQuery');
		this.sendAction('search', query);
	},

	actions: {
		selectClient: function(client) {
			this.set('currentClient', client);
			this.sendAction('clientSelectedAction', client);

		}
	}



});