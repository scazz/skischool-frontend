var duration = DS.Model.extend({
	label: DS.attr('string'),
	hours: DS.attr('number')
});


duration.reopenClass({
	FIXTURES: [
		{
			id: 1,
			label: "2 hours",
			hours: 2
		},
		{
			id: 2,
			label: "3 hours",
			hours: 3
		},
		{ id: 3, label: "2 and half hours", hours: 2.5 }
	]
});

export default duration;

