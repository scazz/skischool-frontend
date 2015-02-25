var pupil = DS.Model.extend({
	name: DS.attr('string'),
	age: DS.attr('number'),
	enrollments: DS.hasMany('enrollment'),
});

pupil.reopenClass({
	FIXTURES: [
		{
			id: 1,
			name: "Sarah",
			age: 10
		},
		{
			id: 2,
			name: "George",
			age: 8
		}
	]
});

export default pupil;