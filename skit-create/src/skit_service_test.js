'use strict';
/**
 * Just a quick sleep to give our elastic cluster time to index
 * @returns {Promise}
 */
function waitForIndexing() {
    return new Promise(function(resolve) {
        setTimeout(resolve, 2000);
    });
}

let client = require('./elastic').client;
let skitService = require('./api/skit_service.js')
    .SkitService(client);
return skitService
    .addSkit("jfb3657", "delete test")
    .then(waitForIndexing)
    .then(function() {
        return client.search({index: 'jfb3657,testing',});
    })
    .then(function(resp) {
        console.log(JSON.stringify(resp, null, 2));
    })
    .then(() => skitService.deleteSkit("jfb3657", "iegS1WIBkT0vLkMg-idx")).then(waitForIndexing)
    .then(function() {
        return client.search({index: 'jfb3657,testing',});
    });
