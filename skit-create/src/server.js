'use strict';

/**
 * Main entry point for our simple express REST API
 */
function main() {
    let express    = require('express');
    let app        = express();
    let bodyParser = require('body-parser');
    let controller = 
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    let port = process.env.PORT || 81;
    let router = express.Router();

    // All routes go here
    let routes = require('./api/skit_controller.js').SkitController(router);
    routes.forEach((route) => { app.use(route, router); });

    app.listen(port);
    console.log('Listening on port:' + port);
}
 
main();
