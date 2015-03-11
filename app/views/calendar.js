import Ember from "ember";


export default Ember.View.extend({



});

/*
export default Ember.ContainerView.extend({

	updateChildViews: function() {
		var self = this;

		console.log( self.get('controller.instructors') );

		self.pushObjects(this.get('controller.instructors').map( function(instructor) {
			return self.createChildView('CalendarInstructorWeek', {instructor: instructor});
		}));

		self.pushObject( self.createChildView(''))

	},

	init: function() {
		this._super();
		this.set('controller', CalendarController.create({}));
		this.updateChildViews();
	}
}); */