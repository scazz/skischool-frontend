var enrollment = DS.Model.extend({
	lesson: DS.belongsTo('lesson'),
	pupil: DS.belongsTo('pupil', {async: true}),
	client: DS.belongsTo('client', {async: true})
});

enrollment.reopenClass({
	FIXTURES: [
		{
			id: 1,
			lesson: 1,
			pupil: 1,
			client: 1
		},
		{
			id: 2,
			lesson: 1,
			pupil: 2,
			client: 1
		}
	]
});

export default enrollment;