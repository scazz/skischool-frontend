import Ember from "ember";

export default Ember.Component.extend({

	client: null,

	pupils: function() {
		if (! this.get('client') ) {
			return null;
		}


		this.get('controller.store').find('pupil').filter( function(pupil) {
			return pupil.get('client') === this.get('client');
		}.bind(this));

	}.property('client')


});