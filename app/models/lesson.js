import Ember from "ember";

var lesson = DS.Model.extend({
	instructor: DS.belongsTo('instructor'),
	type: DS.attr('string'),
	start_time: DS.attr(),
	end_time: DS.attr(),
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
			enrollments: [1,2]
		},
		{
			id: 2,
			instructor: 1,
			start_time: moment().startOf('week').hours(15),
			end_time: moment().startOf('week').hours(17),
		}
	]
});

export default lesson;