import Ember from "ember";

var instructor = DS.Model.extend({

	name: DS.attr('string'),

});


instructor.reopenClass({
	FIXTURES: [
		{
			id: 1,
			name: "Jimmy Chong"
		},
		{
			id: 2,
			name: "Sammy Carr"
		},
		{
			id: 3,
			name: "Freckles"
		}
	]
});

export default instructor;