import Ember from "ember";

export default Ember.Component.extend({
	tagName: 'div',

	classNameBindings: [':time-period', ':lesson', ':group-lesson', 'isSelected:lesson-highlighted'],

	lesson: Ember.required,

	isSelected: function() {
		return this.get('lesson') ? this.get('lesson').isSelected : false;
	}.property('lesson.isSelected'),

	showLessonInfoAction: 'showLessonInfo',
	selectLessonAction: 'selectLesson',
	editLessonAction: 'showEditLessonForm',

	click: function() {
		if ( this.get('isSelected') === false) {
			this.sendAction('selectLessonAction', this.get('lesson'));
			this.sendAction('showLessonInfoAction', this.get('lesson'));
		} else {
			this.sendAction('editLessonAction', this.get('lesson'));
		}

	}
});