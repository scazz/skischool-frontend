import Ember from 'ember';
import { module,  test } from 'qunit';
import startApp from '../helpers/start-app';
import fixtureFactory from '../helpers/pretender-fixture-factory';

var application;
var server;

module('Acceptance: Calendar', {
	beforeEach: function() {
		application = startApp();
		server = fixtureFactory();
	},

	afterEach: function() {
		Ember.run(application, 'destroy');
		server.shutdown();
	}
});

test('visiting /calendar shows instructors and lessons', function(assert) {
  visit('/calendar');

  andThen(function() {
	  var instructors = find(".instructor");
	  assert.equal(instructors.length, 3, "Application loaded three instructors");

	  var firstTimePeriod = find('.time-period:eq(0)');
	  assert.equal( firstTimePeriod.hasClass('lesson'), false, "The first time period doesn't have a lesson booked" );

	  var thirdTimePeriod = find('.time-period:eq(2)');
	  assert.equal( thirdTimePeriod.hasClass('lesson'), true, "The third time period contains a lesson");
  });
});

//test('Find and set an existing client', function(assert) {
//	visit('/calendar');
//
//	andThen( function() {
//
//		assert.equal(1, 1);
//
//	});
//});

