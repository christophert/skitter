'use strict';

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

    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    let port = process.env.PORT || 9090;
    https.createServer(serverOptions, app).listen(port, function() {
        console.log('Listening on port:' + port);
    });
}
 
main();
