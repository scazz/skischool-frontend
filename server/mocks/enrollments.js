module.exports = function(app) {
  var express = require('express');
  var enrollmentsRouter = express.Router();
	var fixtures= require('../fixtures/all');

	var ENROLLMENTS = [
		{
			id: 1,
			lesson: 1,
			pupil:  fixtures().pupils[0],
			client: fixtures().clients[0]
		},
		{
			id: 2,
			lesson: 1,
			pupil: fixtures().pupils[1],
			client: fixtures().clients[0]
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
