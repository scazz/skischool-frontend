import Ember from "ember";

export default Ember.Component.extend({
	tagName: 'div',

	classNameBindings: [':time-period', ':lesson', ':group-lesson', 'isSelected:lesson-highlighted'],

	lesson: Ember.required,

	isSelected: function() {
		return this.get('lesson').isSelected;
	}.property('lesson.isSelected'),

	showLessonInfoAction: 'showLessonInfo',
	selectLessonAction: 'selectLesson',

	click: function() {
		if ( this.get('isSelected') === false) {
			this.sendAction('selectLessonAction', this.get('lesson'));
			//this.set('lesson.isSelected', true);
			this.sendAction('showLessonInfoAction', this.get('lesson'));
		} else {
			console.log( this.get('lesson'));
			console.log("trying to edit a lesson!");
		}

	}
});