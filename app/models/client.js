import DS from "ember-data";

var client = DS.Model.extend({

	name: DS.attr('string'),
	first_name: DS.attr('string'),
	email: DS.attr('string'),
	telephone_1: DS.attr('string'),
	telephone_2: DS.attr('string'),

	fullName: function() {
		return this.get('first_name') + " " + this.get('name');
	}.property('name', 'first_name')

});


client.reopenClass({
	FIXTURES: [

	]
});

export default client;