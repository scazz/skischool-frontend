
module.exports = function(app) {
  var express = require('express');
  var lessonsRouter = express.Router();
	var moment = require('../../bower_components/moment/moment');

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

  lessonsRouter.get('/', function(req, res) {
    res.send({
      'lessons': LESSONS
    });
  });

  lessonsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  lessonsRouter.get('/:id', function(req, res) {
    res.send({
      'lessons': LESSONS.filter(function(lesson) { return lesson.id == req.params.id })
    });
  });

  lessonsRouter.put('/:id', function(req, res) {
    res.send({
      'lessons': {
        id: req.params.id
      }
    });
  });

  lessonsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/lessons', lessonsRouter);
};
