'use strict';

/**
 * Main entry point for our simple express REST API
 */
function main() {
    let express    = require('express');
    let app        = express();
    let bodyParser = require('body-parser');
    let fs = require('fs');
    let serverOptions = {
        key  : fs.readFileSync('certificate.key'),
        cert : fs.readFileSync('certificate.crt')
    };
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require('express-sanitizer')());
    app.use(require('x-xss-protection')());
    app.use(require('helmet')());

    let port = process.env.PORT || 81;
    let router = express.Router();
    // Service instantiation
    let skitService = require('./api/skit_service.js')
        .SkitService(require('./elastic').client);

    // All routes go here
    let routes = require('./api/skit_controller.js')
        .SkitController(router, skitService);
    routes.forEach((route) => { app.use(route, router); });

    require('https').createServer(serverOptions, app).listen(port, function() {
        console.log('Listening on port:' + port);
    });
}
 
main();
