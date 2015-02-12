import Ember from "ember";
import CalendarController from "../controllers/calendar.js";

export default Ember.ContainerView.extend({

	updateChildViews: function() {
		var self = this;

		console.log( self.get('controller.instructors') );

		self.pushObjects(this.get('controller.instructors').map( function(instructor) {
			return self.createChildView('CalendarInstructorWeek', {instructor: instructor});
		}));

	},

	init: function() {
		this._super();
		this.set('controller', CalendarController.create({}));
		this.updateChildViews();
	}
});