import Ember from "ember";

var IndexRoute = Ember.Route.extend({
	model: function() {
		return [
			{
				id: 1,
				name: "test"
			}
		]
	}
});

export default IndexRoute;