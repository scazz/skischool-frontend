var client = DS.Model.extend({

	name: DS.attr('string'),
	first_name: DS.attr('string'),
	email: DS.attr('email'),
	telephone_1: DS.attr('string'),
	telephone_2: DS.attr('string'),

	fullName: function() {
		return this.get('first_name') + " " + this.get('name');
	}.property('name', 'first_name')

});


client.reopenClass({
	FIXTURES: [
		{
			id: 1,
			name: "Punter",
			first_name: "Richy",
			email: "richy@punter.com",
			telephone_1: "+41 077837930",
			telephone_2: "+41 077837930"
		},
	]
});

export default client;