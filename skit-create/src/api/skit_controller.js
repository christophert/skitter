'use strict';

module.exports.SkitController = function SkitController(router) {
     router.get('/', function(req, res) {
         res.json({ message: 'Skitter API Root' });   
     });
     router.get('/AddSkit', function(req, res) {

     });
     router.get('/RemoveSkit', function(req, res) {

     });
     //return a list of 
     return ['/', '/RemoveSkit', '/AddSkit'];
};
