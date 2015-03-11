import DS from "ember-data";

var instructor = DS.Model.extend({

	name: DS.attr('string'),

});

export default instructor;