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

var DURATIONS = [
	{
		id: 1,
		label: "2 hours",
		hours: 2
	},
	{
		id: 2,
		label: "3 hours",
		hours: 3
	},
	{ id: 3, label: "2 and half hours", hours: 2.5 }
];

var CLIENTS = [
	{
		id: 1,
		name: "Punter",
		first_name: "Richy",
		email: "richy@punter.com",
		telephone_1: "+41 077837930",
		telephone_2: "+41 077837930"
	}
];


var setup = function() {

	var starting_id = 100;


	var server = new Pretender(function() {
		this.get('/api/instructors', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( {  instructors: INSTRUCTORS })];
		});
		this.get('/api/lessons', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { lessons: LESSONS })];
		});
		this.get('/api/lesson_durations', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { success:true, "lesson-durations": DURATIONS })];
		});
		this.get('/api/clients', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { "clients": CLIENTS })];
		});

		this.post('/api/pupils', function(request) {
			console.log(request.requestBody);
			starting_id++;
			return [200, {"Content-Type": "application/json"}, JSON.stringify( {"pupil": {"id": starting_id}})];
		});
	});



	return server;
};

export default setup;