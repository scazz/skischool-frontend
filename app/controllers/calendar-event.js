import Ember from "ember";

export default Ember.ObjectController.extend({

	hasLesson: function(){
		return this.get('lesson') !== undefined ;
	}.property('lesson'),

	theid: function() {
		return this.get('id');
	}.property(),

	readableStartTime: function() {
		//console.log ( moment(this.get("start_time")).date() );
		return moment(this.get('start_time')).toString();
	}.property('start_time')

});