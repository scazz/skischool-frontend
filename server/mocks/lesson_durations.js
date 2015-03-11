module.exports = function(app) {
  var express = require('express');
  var lessonDurationsRouter = express.Router();

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

  lessonDurationsRouter.get('/', function(req, res) {
    res.send({
      'lesson-durations': DURATIONS
    });
  });

  lessonDurationsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  lessonDurationsRouter.get('/:id', function(req, res) {
    res.send({
      'lesson-durations': {
        id: req.params.id
      }
    });
  });

  lessonDurationsRouter.put('/:id', function(req, res) {
    res.send({
      'lesson-durations': {
        id: req.params.id
      }
    });
  });

  lessonDurationsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/lesson-durations', lessonDurationsRouter);
};
