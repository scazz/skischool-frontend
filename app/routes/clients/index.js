import Ember from "ember";

export default Ember.Route.extend({
	setupController: function(controller, model) {
		this._super(controller, model);

		//TODO: this should really end up as the model for the route
		//...
		controller.set('currentClient', {});
	}
});