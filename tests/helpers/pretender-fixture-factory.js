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
		type: "private",
		start_time: moment().startOf('week').hours(10),
		end_time:   moment().startOf('week').hours(13),
		duration: 2,
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
	},
	{
		id: 3,
		instructor: 1,
		type: "private",
		start_time: moment().startOf('week').hours(8).add(7, 'days'),
		end_time:   moment().startOf('week').hours(11).add(7, 'days'),
		duration: 2,
		level: 	"2",
		enrollments: [1,2]
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

var PUPILS = [
	{
		id: 1,
		name: "Sarah",
		age: 10,
		level: 2
	},
	{
		id: 2,
		name: "George",
		age: 8,
		level: 3
	}
];
var ENROLLMENTS = [
	{
		id: 1,
		lesson: 1,
		pupil:  PUPILS[0],
		client: CLIENTS[0]
	},
	{
		id: 2,
		lesson: 1,
		pupil: PUPILS[1],
		client: CLIENTS[0]
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
		this.post('/api/lessons', function(request) {
			starting_id++;
			return [200, {"Content-Type": "application/json"}, JSON.stringify( {"lesson": {"id": starting_id}})];
		});
		this.put('/api/lessons/:id', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { lesson: LESSONS[request.params.id-1] })];
		});


		this.get('/api/lesson_durations', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { success:true, "lesson-durations": DURATIONS })];
		});
		this.get('/api/lesson_durations/:id', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { success:true, "lesson-duration": DURATIONS[request.params.id-1] })];
		});
		this.get('/api/clients', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { "clients": CLIENTS })];
		});


		this.get('/api/pupils', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { pupils: PUPILS })];
		});
		this.post('/api/pupils', function(request) {
			starting_id++;
			return [200, {"Content-Type": "application/json"}, JSON.stringify( {"pupil": {"id": starting_id}})];
		});



		this.get('/api/enrollments', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { enrollments: ENROLLMENTS })];
		});
		this.post('/api/enrollments', function(request) {
			starting_id++;
			return [200, {"Content-Type": "application/json"}, JSON.stringify( {"enrollment": {"id": starting_id}})];
		});
		this.put('/api/enrollments/:id', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { enrollment: ENROLLMENTS[request.params.id-1] })];
		});
		this.get('/api/enrollments/:id', function(request) {
			return [200, {"Content-Type": "application/json"}, JSON.stringify( { enrollment: ENROLLMENTS[request.params.id-1] })];
		});



	});



	return server;
};

export default setup;