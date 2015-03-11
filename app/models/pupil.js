import DS from "ember-data";

var pupil = DS.Model.extend({
	name: DS.attr('string'),
	age: DS.attr('number'),
	level: DS.attr('string'),
	enrollments: DS.hasMany('enrollment'),


	description: function() {
		return "Level: "+this.get('level')+"; Age: " + this.get('age');
	}.property('age', 'level')

});

pupil.reopenClass({
	FIXTURES: [
		{
			id: 1,
			name: "Sarah",
			age: 10,
			level: 2
		},
		{
			id: 2,
			name: "George",
			age: 8,
			level: 3
		}
	]
});

export default pupil;