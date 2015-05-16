import Ember from "ember";

export default Ember.Component.extend({
	tagName: 'div',

	classNames: ['view-next-week'],

	click: function() {
		this.sendAction("changeWeekAction");
	}

});