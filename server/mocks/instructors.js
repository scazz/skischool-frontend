module.exports = function(app) {
  var express = require('express');
  var instructorsRouter = express.Router();

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

  instructorsRouter.get('/', function(req, res) {
    res.send({
      'instructors': INSTRUCTORS
    });
  });

  instructorsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  instructorsRouter.get('/:id', function(req, res) {
    res.send({
      'instructors': {
        id: req.params.id
      }
    });
  });

  instructorsRouter.put('/:id', function(req, res) {
    res.send({
      'instructors': {
        id: req.params.id
      }
    });
  });

  instructorsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/instructors', instructorsRouter);
};
