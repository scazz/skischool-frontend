import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('calendar', function() {
		this.route('info',{ path: ':id/info'});
		this.route('new-lesson',{ path: 'new/:base_event_id'});
		this.route('client-modal');
	});
});

export default Router;
