import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: EditLesson', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('Clicking an unselected lesson marks it as selected', function() {
	var firstLessonBlock1;
	visit('/calendar');

	andThen(function() {
	  firstLessonBlock1 = find('.lesson:eq(0)');
	  equal( firstLessonBlock1.hasClass('lesson-highlighted'), false, "Lesson's default state is not highlighted" );
  });

	click('.lesson:eq(0)');

	andThen(function() {
		ok( firstLessonBlock1.hasClass('lesson-highlighted'), "Lesson becomes highlighted after being clicked");

		var firstLessonBlock2 = find('.lesson:eq(1)');
		ok( firstLessonBlock2.hasClass('lesson-highlighted'), "Other time periods representing lesson become highlighted");
	});

	click('.lesson:eq(2)');

	andThen(function() {
		ok(! firstLessonBlock1.hasClass('lesson-highlighted'), "First lesson is deselected when a different lesson is clicked");
	})
});
