import DS from "ember-data";

var lesson = DS.Model.extend({
	instructor: DS.belongsTo('instructor', {async: true}),
	type: DS.attr('string'),
	start_time: DS.attr(),
	end_time: DS.attr(),
	duration: DS.belongsTo('lesson-duration', {async: true}),
	level: DS.attr('string'),
	enrollments: DS.hasMany('enrollment', {async: true}),

	isSelected: false,

	isPrivate: function() {
		console.log("called");
		console.log ( this.get('type'));
		return this.get('type') === 'private';
	}.property('type')
});


lesson.reopenClass({
	FIXTURES: [

	]
});

export default lesson;