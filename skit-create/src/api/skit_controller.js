'use strict';

module.exports.SkitController = function SkitController(service) {
    let express = require('express');
    let router = express.Router();
    let security = require('./skit_security').SkitSecurity;

    router.get('/', function(req, res) {
        res.json({ message: 'Skitter API Root' });
    });
    router.post('/AddSkit', function(req, res) {
        let msg = req.body.msg;
        return security.getUid(req)
            .catch((err) => res.status(401).send({error:err}).end())
            .then((id) => service.addSkit(id, msg))
            .then(() => res.end())
            .catch((err) => res.status(404).send({error:err}).end());
    });
    router.delete('/RemoveSkit', function(req, res) {
        let skitId = req.query.skitId;
        return security.getUid(req)
            .catch((err) => res.status(401).send({error:err}).end())
            .then((id) => service.deleteSkit(id, skitId))
            .then(() => res.end())
            .catch((err) => res.status(404).send({error:err}).end());
    });
    router.get('/GetSkits', function(req, res) {
        let id = req.query.id;
        return security.getUid(req)
            .catch((err) => res.status(401).send({error:err}).end())
            .then(() => service.getSkits(id))
            .then((data) => res.send(data).end())
            .catch((err) => res.status(404).send({error:err}).end());
    });
    return router;
};
