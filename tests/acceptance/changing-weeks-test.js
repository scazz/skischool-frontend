import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'skischool/tests/helpers/start-app';
import fixtureFactory from '../helpers/pretender-fixture-factory';

var application;
var server;

module('Acceptance: ChangingWeeks', {
  beforeEach: function() {
    application = startApp();
	  server = fixtureFactory();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
	  server.shutdown();
  }
});

test('can move one week backwards', function(assert) {
  visit('/calendar');

  andThen(function() {
	var thirdTimePeriod = find('.time-period:eq(2)');
	assert.equal( thirdTimePeriod.hasClass('lesson'), true, "The third time period starts with a lesson");
  });

  click( find('.view-previous-week'));

  andThen(function() {
	  var thirdTimePeriod = find('.time-period:eq(2)');
	  assert.equal( thirdTimePeriod.hasClass('lesson'), false, "The third time period of the previous week has no lesson");
  });
});

test('can move one week forwards', function(assert) {

	visit('/calendar');

	andThen(function() {
		var firstTimePeriod = find('.time-period:eq(1)');
		assert.equal( firstTimePeriod.hasClass('lesson'), false, "The first time period starts without a lesson");
	});

	click( find('.view-next-week'));

	andThen(function() {
		var firstTimePeriod = find('.time-period:eq(1)');
		assert.equal( firstTimePeriod.hasClass('lesson'), true, "The first time period now has a lesson");
	})

});
