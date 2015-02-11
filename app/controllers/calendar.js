export default Ember.ObjectController.extend({

	instructors: [
		{
			id: 1,
			name: "jimmy"
		}
	],

	events: [
		{
			id: 1,
			instructor: 1,
			type: "group",
			start_time: 1010,
			end_time:   1045
		}
	]

});