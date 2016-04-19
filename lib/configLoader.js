'use strict';

module.exports = {

    /**
     * Loads configuration and merge basic and
     * environment-related configuration.
     * @returns {Object} Merged configuration.
     */
        load() {
        const baseConfig = require('../config/browser.json');
        const environmentConfig = require('../config/environment.json');

        return merge(baseConfig, environmentConfig);
    }
};

/**
 * Merges pair of objects into first.
 * @param {Object} obj1 First object.
 * @param {Object} obj2 Second object.
 * @returns {Object} Merged object.
 */
function merge(obj1, obj2) {
    if (typeof (obj1) !== 'object') {
        return obj2;
    }

    Object.keys(obj2)
        .forEach((key) => {
            if (Array.isArray(obj2[key]) &&
                Array.isArray(obj1[key])) {
                obj1[key] = obj1[key].concat(obj2[key]);
            } else if (typeof (obj2[key]) === 'object' &&
                typeof (obj1[key]) === 'object') {
                obj1[key] = merge(obj1[key], obj2[key]);
            } else {
                obj1[key] = obj2[key];
            }
        });
    return obj1;
}