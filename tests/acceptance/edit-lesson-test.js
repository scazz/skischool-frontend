import Ember from 'ember';
import { module,  test } from 'qunit';
import startApp from '../helpers/start-app';
import QUnit from "qunit";
import fixtureFactory from '../helpers/pretender-fixture-factory';

QUnit.assert.contains = function( needle, haystack, message ) {
	var actual = haystack.indexOf(needle) > -1;
	this.push(actual, haystack, needle, message);
};

var application;
var server;

module('Acceptance: EditLesson', {
	beforeEach: function() {
		application = startApp();
		server = fixtureFactory();
	},

	afterEach: function() {
		server.shutdown();
		Ember.run(application, 'destroy');
	}
});

test('Clicking lessons marks them as selected', function(assert) {
	var firstLessonBlock1;
	visit('/calendar');

	andThen(function() {
	  firstLessonBlock1 = find('.lesson:eq(0)');
	  assert.equal( firstLessonBlock1.hasClass('lesson-highlighted'), false, "Lesson's default state is not highlighted" );
    });

	click('.lesson:eq(0)');

	andThen(function() {
		assert.ok( firstLessonBlock1.hasClass('lesson-highlighted'), "Lesson becomes highlighted after being clicked");

		var firstLessonBlock2 = find('.lesson:eq(1)');
		assert.ok( firstLessonBlock2.hasClass('lesson-highlighted'), "Other time periods representing lesson become highlighted");
	});

	click('.lesson:eq(4)');

	andThen(function() {
		assert.ok(! firstLessonBlock1.hasClass('lesson-highlighted'), "First lesson is deselected when a different lesson is clicked");
	});
});

test('double clicking a lesson opens edit lesson modal', function(assert) {
	var instructorName = "Jimmy";
	visit('/calendar');
	click('.lesson:eq(0)');
	click('.lesson:eq(0)');

	andThen(function() {
		assert.equal(currentPath(), 'calendar.edit-lesson');
		QUnit.assert.contains(  instructorName, find('.lesson-form .instructor').text(), "The correct instructor is selected" );

		assert.equal( find('.lesson-form .start-time').val(), "10:00", "Start time should be 10:00");
		var pupils = find('.pupil-list .pupil');
		assert.equal(pupils.length, 2, "2 pupils were added to the lesson");

		var clientName = find('.lesson-form span.clientName');
		assert.equal( clientName.text(), "Richy Punter", "The correct client for the lesson is displayed");
	});

	click('.save-btn');

	andThen(function() {
		assert.equal(currentPath(), 'calendar.index');
	});

});

test('I can change a lesson time', function(assert) {
	visit('/calendar');

	andThen( function() {
		var firstTimePeriod = find('.time-period:eq(0)');
		assert.equal( firstTimePeriod.hasClass('lesson'), false, "The first time period doesn't have a lesson booked" );
	});

	click('.lesson:eq(0)');
	click('.lesson:eq(0)');

	andThen(function() {
		assert.equal(currentPath(), 'calendar.edit-lesson');
		var time = find('.lesson-form .start-time');
		assert.equal(time.val(), "10:00", "The start time is 10:00 before editing");
	});

	fillIn('.lesson-form .start-time', "9:00");
	andThen(function() {
		find('.lesson-form .start-time').blur();
	});
	click('.save-btn');
	andThen( function() {
		assert.equal(currentPath(), 'calendar.index', "We routed back to calendar overview");

		var firstTimePeriod = find('.time-period:eq(0)');
		var fithTimePeriod = find('.time-period:eq(4)');

		assert.ok( firstTimePeriod.hasClass('lesson'), "The first time period has a lesson booked" );
		assert.ok(! fithTimePeriod.hasClass('lesson'), "The old time periods no longer have a lesson attached");
	});
});
