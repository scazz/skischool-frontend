import Ember from 'ember';
import { module,  test } from 'qunit';
import startApp from '../helpers/start-app';
import fixtureFactory from '../helpers/pretender-fixture-factory';

import fillSelect2Box from "../helpers/fill-select-box";

var application;
var server;

module('Acceptance: BookingLessons', {
	beforeEach: function() {
		application = startApp();
		server = fixtureFactory();
	},

	afterEach: function() {
		console.log("destroying");
		server.shutdown();
		Ember.run(application, 'destroy');
	}
});

test('I can create a new lesson', function(assert) {
  visit('/calendar');

  andThen(function() {
	  var firstTimePeriod = find('.time-period:eq(0)');
	  assert.equal( firstTimePeriod.hasClass('lesson'), false, "The first time period doesn't have a lesson booked" );

	  click( '.time-period:eq(0)' );
  });

	andThen(function() {
		assert.equal(currentPath(), 'calendar.new-lesson', "We routed to our modal");

		fillIn('.lesson-form .clientName', "Smith");
		fillIn('.lesson-form .clientFirstName', "John");

		fillIn('.lesson-form .pupilName', "pupil");
	});

	andThen(function() {
		click('.save-btn');
	});

	andThen(function() {
		var firstTimePeriod = find('.time-period:eq(0)');
		assert.equal( firstTimePeriod.hasClass('lesson'), true, "The first time period now has a lesson booked" );
	});
});


test('I can add 1 client but multiple pupils for a private lesson', function(assert) {
	visit('/calendar');

	var pupil1 = { name: "Sam Carr", age: 8 };
	var pupil2 = { name: "Sarah Smith", age: 12};

	andThen(function() {
		var firstTimePeriod = find('.time-period:eq(0)');
		assert.equal( firstTimePeriod.hasClass('lesson'), false, "The first time period doesn't have a lesson booked" );

	});
	click( '.time-period:eq(0)' );

	fillSelect2Box('.lesson-type', 'Private', assert);
	fillIn('.lesson-form .clientName', "Smith");
	fillIn('.lesson-form .clientFirstName', "John");

	fillIn('.lesson-form .pupilName', pupil1.name);
	fillIn('.lesson-form .pupilAge', pupil1.age);

	click('.add-pupil');

	andThen( function() {
		var pupils = find('.pupil-list .pupil');
		assert.equal(pupils.length, 1, "One pupil exists in the pupil list");
		assert.equal(find('.pupil-list .pupil:eq(0)').text(), pupil1.name);

		assert.equal(find('.lesson-form .pupilName').val(), "", "The pupil name has been reset");
		assert.equal(find('.lesson-form .pupilAge').val(), "", "The pupil age has been reset");

		fillIn('.lesson-form .pupilName', pupil2.name);
		fillIn('.lesson-form .pupilAge', pupil2.age);

		click('.save-btn');
	});

	andThen(function() {
		var firstTimePeriod = find('.time-period:eq(0)');
		assert.ok( firstTimePeriod.hasClass('lesson'), "The lesson was created" );
	});
	andThen(function() {
		click('.time-period:eq(0)');
	});
	andThen(function() {
		var pupils = find('.info .pupil-list .pupil');
		assert.equal(pupils.length, 2, "2 pupils were added to the lesson");

		assert.ok (find('.info .pupil-list .pupil:eq(0)').text().indexOf(pupil1.name) > -1, "First pupils name matches");
		assert.ok (find('.info .pupil-list .pupil:eq(1)').text().indexOf(pupil2.name) > -1, "Second pupils name matches");
	});

});
