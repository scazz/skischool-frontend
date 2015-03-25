export default function(boxSelector, elementText, assert) {
	click(boxSelector + ' .select2-choice');
	// then select an option
	click('.select2-results li:contains("'+elementText+'")', 'body');

	andThen(function() {
		assert.equal($(boxSelector + ' .select2-chosen').text(), elementText, "has correct text");
	});
}