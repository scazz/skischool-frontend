import DS from "ember-data";

var duration = DS.Model.extend({
	label: DS.attr('string'),
	hours: DS.attr('number')
});


duration.reopenClass({
	FIXTURES: [

	]
});

export default duration;

