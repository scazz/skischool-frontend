import Ember from 'ember';
import startApp from '../helpers/start-app';
import fixtureFactory from '../helpers/pretender-fixture-factory';

import fillSelect2Box from "../helpers/fill-select-box";

var application;
var server;

module('Acceptance: BookingLessons', {
  setup: function() {
    application = startApp();
	  server = fixtureFactory();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
	server.shutdown();
  }
});

test('I can create a new lesson', function() {
  visit('/calendar');

  andThen(function() {
	  var firstTimePeriod = find('.time-period:eq(0)');
	  equal( firstTimePeriod.hasClass('lesson'), false, "The first time period doesn't have a lesson booked" );

	  click( '.time-period:eq(0)' );
  });

	andThen(function() {
		equal(currentPath(), 'calendar.new-lesson', "We routed to our modal");

		fillIn('.lesson-form .clientName', "Smith");
		fillIn('.lesson-form .clientFirstName', "John");

		fillIn('.lesson-form .pupilName', "pupil");
	});

	andThen(function() {
		click('.save-btn');
	});

	andThen(function() {
		var firstTimePeriod = find('.time-period:eq(0)');
		equal( firstTimePeriod.hasClass('lesson'), true, "The first time period now has a lesson booked" );
	});
});


test('I can add 1 client but multiple pupils for a private lesson', function() {
	visit('/calendar');

	var pupil1 = { name: "Sam Carr", age: 8 };
	var pupil2 = { name: "Sarah Smith", age: 12};

	andThen(function() {
		var firstTimePeriod = find('.time-period:eq(0)');
		equal( firstTimePeriod.hasClass('lesson'), false, "The first time period doesn't have a lesson booked" );

	});
	click( '.time-period:eq(0)' );

	fillSelect2Box('.lesson-type', 'Private');
	fillIn('.lesson-form .clientName', "Smith");
	fillIn('.lesson-form .clientFirstName', "John");

	fillIn('.lesson-form .pupilName', pupil1.name);
	fillIn('.lesson-form .pupilAge', pupil1.age);

	click('.add-pupil');

	andThen( function() {
		var pupils = find('.pupil-list .pupil');
		equal(pupils.length, 1, "One pupil exists in the pupil list");
		equal(find('.pupil-list .pupil:eq(0)').text(), pupil1.name);

		equal(find('.lesson-form .pupilName').val(), "", "The pupil name has been reset");
		equal(find('.lesson-form .pupilAge').val(), "", "The pupil age has been reset");

		fillIn('.lesson-form .pupilName', pupil2.name);
		fillIn('.lesson-form .pupilAge', pupil2.age);

		click('.save-btn');
	});

	andThen(function() {
		var firstTimePeriod = find('.time-period:eq(0)');
		ok( firstTimePeriod.hasClass('lesson'), "The lesson was created" );
	});
	andThen(function() {
		click('.time-period:eq(0)');
	});
	andThen(function() {
		var pupils = find('.info .pupil-list .pupil');
		equal(pupils.length, 2, "2 pupils were added to the lesson");

		ok (find('.info .pupil-list .pupil:eq(0)').text().indexOf(pupil1.name) > -1, "First pupils name matches");
		ok (find('.info .pupil-list .pupil:eq(1)').text().indexOf(pupil2.name) > -1, "Second pupils name matches");
	});

});
