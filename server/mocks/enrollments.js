module.exports = function(app) {
  var express = require('express');
  var enrollmentsRouter = express.Router();

	var ENROLLMENTS = [
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
	];
  enrollmentsRouter.get('/', function(req, res) {
    res.send({
      'enrollments': ENROLLMENTS
    });
  });

  enrollmentsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  enrollmentsRouter.get('/:id', function(req, res) {
    res.send({
      'enrollments': ENROLLMENTS.filter(function(lesson) { return lesson.id == req.params.id })
    });
  });

  enrollmentsRouter.put('/:id', function(req, res) {
    res.send({
      'enrollments': {
        id: req.params.id
      }
    });
  });

  enrollmentsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/enrollments', enrollmentsRouter);
};
