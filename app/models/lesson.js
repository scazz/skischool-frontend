import Ember from "ember";

var lesson = DS.Model.extend({
	instructor: DS.belongsTo('instructor', {async: true}),
	type: DS.attr('string'),
	start_time: DS.attr(),
	end_time: DS.attr(),
	level: DS.attr('string'),
	enrollments: DS.hasMany('enrollment', {async: true})
});


lesson.reopenClass({
	FIXTURES: [
		{
			id: 1,
			instructor: 1,
			type: "group",
			start_time: moment().startOf('week').hours(10),
			end_time:   moment().startOf('week').hours(12),
			level: 	"2",
			enrollments: [1,2]
		},
		{
			id: 2,
			instructor: 1,
			type: "group",
			start_time: moment().startOf('week').hours(15),
			end_time: moment().startOf('week').hours(17),
			level: "3",
		}
	]
});

export default lesson;