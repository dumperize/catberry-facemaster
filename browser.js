'use strict';

var catberry = require('catberry'),
// this config will be replaced by `./config/browser.json` when building
// because of `browser` field in `package.json`
    config = require('./config/environment.json'),
    templateEngine = require('fm-hbs'),
    cat = catberry.create(config);

// register template provider to Catberry Service Locator
templateEngine.register(cat.locator);

/* helpers for handlebars */
var handlebars = cat.locator.resolve('handlebars');
var helpers = require('./lib/handlebars-helpers')(handlebars);

Object.keys(helpers)
    .forEach(function (name) {
        handlebars.registerHelper(name, helpers[name]);
    });
/* end helpers for handlebars */

cat.startWhenReady();

