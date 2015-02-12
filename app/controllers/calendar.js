import Ember from "ember";

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
			start_time: 1423734220099,
			end_time:   1423735220099
		}
	]

});