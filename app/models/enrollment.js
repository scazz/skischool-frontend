import DS from "ember-data";

var enrollment = DS.Model.extend({
	lesson: DS.belongsTo('lesson'),
	pupil: DS.belongsTo('pupil'),
	client: DS.belongsTo('client')
});

export default enrollment;