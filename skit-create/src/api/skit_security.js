'use strict';

module.exports.SkitSecurity = {
    /**
     * Does a quick promise rejection if the two user ids are not equal
     */
    getUid : function getUid(req) {
        let skitterUser = req.get('X-SKITTER-AUTH-USER');
        let skitterName = req.get('X-SKITTER-AUTH-NAME');
        if (!skitterUser) {
            return Promise.resolve("There is no User ID set here");
        }
        if (!skitterName) {
            return Promise.resolve("There is no User Name set here");
        }
        return Promise.resolve({uid: skitterUser, name:skitterName});
    }
};
