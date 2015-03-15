import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('calendar', function() {
		this.route('info',{ path: ':id/info'});
		this.route('new-lesson',{ path: 'new'});
		this.route('edit-lesson', {path: ':id/edit'});
		this.resource('clients', function() {
			this.resource('client', {path: ':client_id'}, function() {
				this.route('history');
			});
		});
	});
});

export default Router;
