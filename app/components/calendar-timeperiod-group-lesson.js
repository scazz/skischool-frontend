import Ember from "ember";

export default Ember.Component.extend({
	tagName: 'div',

	classNames: ['time-period', 'lesson', 'group-lesson'],

	showLessonInfoAction: 'showLessonInfo',

	click: function() {
		console.log(this.get('lesson'));
		this.sendAction('showLessonInfoAction', this.get('lesson'));
	}
});