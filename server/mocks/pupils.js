module.exports = function(app) {
  var express = require('express');
  var pupilsRouter = express.Router();

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

  pupilsRouter.get('/', function(req, res) {
    res.send({
      'pupils': PUPILS
    });
  });

  pupilsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  pupilsRouter.get('/:id', function(req, res) {
    res.send({
      'pupils': PUPILS.filter(function(lesson) { return lesson.id == req.params.id })
    });
  });

  pupilsRouter.put('/:id', function(req, res) {
    res.send({
      'pupils': {
        id: req.params.id
      }
    });
  });

  pupilsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/pupils', pupilsRouter);
};
