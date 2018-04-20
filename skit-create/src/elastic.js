'use strict';
let elasticsearch = require('elasticsearch');
/**
 * Responsible for connecting to the elasticsearch client and
 * setting elasticsearch settings.
 */
module.exports.client = new elasticsearch.Client({
    host: [
        {
            host: 'skitdb',
            auth: 'elastic:s00pers3cur3pa$$word',
            protocol: 'https',
            port: 9200
        }
    ],
    log: 'warning'
});