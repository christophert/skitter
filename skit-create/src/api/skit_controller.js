'use strict';

module.exports.SkitController = function SkitController(router) {
     router.get('/', function(req, res) {
         res.json({ message: 'Skitter API Root' });   
     });
     //return a list of 
     return ['/'];
};
