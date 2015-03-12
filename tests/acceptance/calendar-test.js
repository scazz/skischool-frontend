import Ember from 'ember';
import startApp from '../helpers/start-app';
import fixtureFactory from '../helpers/pretender-fixture-factory';

var application;
var server;

module('Acceptance: Calendar', {
  setup: function() {
    application = startApp();
	server = fixtureFactory();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
	  server.shutdown();
  }
});

test('visiting /calendar shows instructors and lessons', function() {
  visit('/calendar');

  andThen(function() {
	  var instructors = find(".instructor");
	  equal(instructors.length, 3, "Application loaded three instructors");

	  var firstTimePeriod = find('.time-period:eq(0)');
	  equal( firstTimePeriod.hasClass('lesson'), false, "The first time period doesn't have a lesson booked" );

	  var thirdTimePeriod = find('.time-period:eq(2)');
	  equal( thirdTimePeriod.hasClass('lesson'), true, "The third time period contains a lesson");
  });
});

test('Find and set an existing client', function() {
	visit('/calendar');

	andThen( function() {

		equal(1, 1);

	});
});

