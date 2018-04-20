'use strict';

module.exports.SkitController = function SkitController(router, service) {
     router.get('/', function(req, res) {
         res.json({ message: 'Skitter API Root' });
     });
     router.post('/AddSkit', function(req, res) {
         let id = req.body.id;
         let msg = req.body.msg;
         return service.addSkit(id, msg)
             .then(() => res.end())
             .catch((err) => res.status(401).send({error:err}).end());
     });
     router.delete('/RemoveSkit', function(req, res) {
         let id = req.query.id;
         let skitId = req.query.skitId;
         return service.deleteSkit(id, skitId)
             .then(() => res.end())
             .catch((err) => res.status(401).send({error:err}).end());
     });
     router.get('/GetSkits', function(req, res) {
         let id = req.query.id;
         return service.getSkits(id)
             .then((data) => res.send(data).end())
             .catch((err) => res.status(401).send({error:err}).end());
     });
     //return a list of
     return ['/', '/RemoveSkit', '/AddSkit', '/GetSkits'];
};
