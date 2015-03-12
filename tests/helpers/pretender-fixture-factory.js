import Pretender from "pretender";

var clients = [

];

var INSTRUCTORS = [
	{
		id: 1,
		name: "Jimmy Chong"
	},
	{
		id: 2,
		name: "Sammy Carr"
	},
	{
		id: 3,
		name: "Freckles"
	}
];

var LESSONS = [
	{
		id: 1,
		instructor: 1,
		type: "group",
		start_time: moment().startOf('week').hours(10),
		end_time:   moment().startOf('week').hours(12),
		level: 	"2",
		enrollments: [1,2]
	},
	{
		id: 2,
		instructor: 1,
		type: "group",
		start_time: moment().startOf('week').hours(15),
		end_time: moment().startOf('week').hours(17),
		level: "3",
	}
];


var setup = function() {

	var server = new Pretender(function() {
		this.get('/api/instructors', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { success: true, instructors: INSTRUCTORS })];
		});
		this.get('/api/lessons', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { success: true, lessons: LESSONS })];
		});
	});



	return server;
};

export default setup;