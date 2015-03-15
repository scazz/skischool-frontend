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

export default pupil;