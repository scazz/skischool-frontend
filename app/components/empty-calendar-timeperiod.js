import Ember from "ember";

export default Ember.Component.extend({
	tagName: 'div',

	classNames: ['time-period'],

	createNewLessonAction: 'showNewLessonForm',

	click: function() {
		this.sendAction('createNewLessonAction', this.get('template'));
	}
});