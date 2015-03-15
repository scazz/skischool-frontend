export default function(boxSelector, elementText) {
	click(boxSelector + ' .select2-choice');
	// then select an option
	click('.select2-results li:contains("'+elementText+'")', 'body');

	andThen(function() {
		equal($(boxSelector + ' .select2-chosen').text(), elementText, "has correct text");
	});
}