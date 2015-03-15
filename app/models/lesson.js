import DS from "ember-data";

var lesson = DS.Model.extend({
	instructor: DS.belongsTo('instructor', {async: true}),
	type: DS.attr('string'),
	start_time: DS.attr(),
	end_time: DS.attr(),
	level: DS.attr('string'),
	enrollments: DS.hasMany('enrollment', {async: true}),

	isSelected: false,
});


lesson.reopenClass({
	FIXTURES: [

	]
});

export default lesson;