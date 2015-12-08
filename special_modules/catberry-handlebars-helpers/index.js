'use strict';



module.exports = {
    /**
     * Registers all helpers.
     * @param {ServiceLocator} locator Catberry's service locator.
     */
    register: function (locator) {
        var config = locator.resolve('config');
        try {
            var handlebars = locator.resolve('handlebars');
            var helpers = require('./handlebars-helper')(handlebars);

            Object.keys(helpers)
                .forEach(function (name) {
                    handlebars.registerHelper(name, helpers[name]);
                });
        } catch (e) {
            // nothing to do.
        }
    }
};