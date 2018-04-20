'use strict';

module.exports.SkitSecurity = {
    /**
     * Does a quick promise rejection if the two user ids are not equal
     */
    getUid : function getUid(req) {
        let skitterUser = req.get('X-SKITTER-AUTH-USER');
        if (!skitterUser) {
            return Promise.resolve("There is no User ID set here");
        }
        return Promise.resolve(skitterUser);
    }
};
