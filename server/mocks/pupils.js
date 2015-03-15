module.exports = function(app) {
  var express = require('express');
  var pupilsRouter = express.Router();
	var bodyParser = require('body-parser')
	app.use( bodyParser.json() );       // to support JSON-encoded bodies

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
	  var pupil = {
		  id: PUPILS.length+1,
		  name: req.body.pupil.name,
		  age: req.body.pupil.age
	  };

	  PUPILS.push( pupil );

	  res.send( {'pupil': pupil });
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
