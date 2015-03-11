import DS from "ember-data";

var enrollment = DS.Model.extend({
	lesson: DS.belongsTo('lesson'),
	pupil: DS.belongsTo('pupil', {async: true}),
	client: DS.belongsTo('client', {async: true})
});

export default enrollment;