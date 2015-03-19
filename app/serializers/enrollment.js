import DS from "ember-data";

export default DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
	attrs: {
		client: {embedded: 'always'},
		pupil: {embedded: 'always'}
	}
});