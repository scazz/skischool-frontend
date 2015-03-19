module.exports = function(app) {
  var express = require('express');
  var clientsRouter = express.Router();
	var fixtures= require('../fixtures/all');

	var CLIENTS = fixtures().clients;

  clientsRouter.get('/', function(req, res) {
    res.send({
      'clients': CLIENTS
    });
  });

  clientsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  clientsRouter.get('/:id', function(req, res) {
    res.send({
      'clients': CLIENTS.filter(function(lesson) { return lesson.id == req.params.id })
    });
  });

  clientsRouter.put('/:id', function(req, res) {
    res.send({
      'clients': {
        id: req.params.id
      }
    });
  });

  clientsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/clients', clientsRouter);
};
