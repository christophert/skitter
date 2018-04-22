'use strict';

module.exports.SkitService = function SkitService(client) {
    let xss = require('xss');

    function _addSkit(id, fullname, message) {
        return client.index({
            index: id,
            type: 'skits',
            body: {
                name: fullname,
                msg: message,
                date: new Date()
            }
        });
    }

    function _addIndex(id) {
        return client.indices.create({
            index: id,
            body: {
                mappings: {
                    skits: {
                        properties: {
                            name: {type:'text'},
                            msg: {type:'text'},
                            date: {type:'date'}
                        }
                    }
                }
            }
        });
    }

    return {
        /**
         * Adds a skit to the elastic cluster
         * index: uid
         * type: skits
         * content: {msg, date}
         * @param id
         * @param message
         * @returns {*}
         */
        addSkit : function addSkit(id, fullname, message) {
            id = xss(id || '');
            message = xss(message || '');
            if (!id) {
                return Promise.reject("Invalid id");
            }
            if (!fullname) {
                return Promise.reject("No name supplied");
            }
            if (!message || message.length > 140) {
                return Promise.reject("Message must be less than 140 characters and must contin data");
            }

            return client.indices.exists({index:id})
                .then(function (exists) {
                    if (exists) {
                        return _addSkit(id, fullname, message);
                    }
                    return _addIndex(id)
                        .then(() => _addSkit(id, fullname, message));
                });
        },

        /**
         * Removes a skit by it's unique identifier from a user's
         * index
         * @param id user id
         * @param skitId skit id
         * @returns {*}
         */
        deleteSkit : function deleteSkit(id, skitId) {
            //id = xss(id || '');
            //skitId = xss(skitId || '');
            if (!id || !skitId) {
                return Promise.reject("Invalid user id or skit id");
            }

            return client.indices.exists({
                index: id
            }).then(function (exists) {
                if (exists) {
                    return client.delete({
                        index: id,
                        type: 'skits',
                        id: skitId
                    });
                }
                return Promise.reject("User ID does not exist");
            });
        },

        /**
         * Gets all of the skits for a set of indexes with elastic
         * search
         * @param id 1 or more comma seperated userids
         * @returns {Promise.<*>}
         */
        getSkits : function getSkits(id) {
            id = xss(id || '');
            if (!id) {
                return Promise.reject("No ID supplied");
            }

            return client.search({
                index: id,
                sort: [ 'date:desc' ]
            });
        }
    };
};
