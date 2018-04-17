'use strict';

/**
 * Main entry point for our simple express REST API
 */
function main() {
    let express    = require('express');
    let app        = express();
    let bodyParser = require('body-parser');
    let expressSanitizer = require('express-sanitizer');
    let xssFilter = require('x-xss-protection');
    let https = require('https');
    let fs = require('fs');
    let serverOptions = {
        key  : fs.readFileSync('certificate.key'),
        cert : fs.readFileSync('certificate.crt')
    };

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressSanitizer());
    app.use(xssFilter());
    //configure elasticsearch client
    let elasticsearch = require('elasticsearch');
    let elasticclient = new elasticsearch.Client({
        host: [
            {
                host: 'skitdb',
                auth: 'elastic:s00pers3cur3pa$$word',
                protocol: 'https',
                port: 9200
            }
        ],
        log: 'trace'
    });

    let port = process.env.PORT || 81;
    let router = express.Router();
    // Service instantiation
    let skitService = require('./api/skit_service.js')
        .SkitService(elasticclient);

    // All routes go here
    let routes = require('./api/skit_controller.js')
        .SkitController(router, skitService);
    routes.forEach((route) => { app.use(route, router); });

    https.createServer(serverOptions, app).listen(port, function() {
        console.log('Listening on port:' + port);
    });
}
 
main();
