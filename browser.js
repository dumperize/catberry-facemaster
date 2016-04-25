'use strict';

// this config will be replaced by `./config/browser.json` when building
// because of `browser` field in `package.json`
const config = require('./config/environment.json');

// catberry application
const catberry = require('catberry');
const cat = catberry.create(config);

// register Catberry plugins needed in a browser
const templateEngine = require('fm-catberry-handlebars');
templateEngine.register(cat.locator);

/* helpers for handlebars */
var handlebars = cat.locator.resolve('handlebars');
var helpers = require('./lib/handlebars-helpers')(handlebars);

Object.keys(helpers)
    .forEach(function (name) {
        handlebars.registerHelper(name, helpers[name]);
    });
/* end helpers for handlebars */

const loggerPlugin = require('catberry-logger');
loggerPlugin.register(cat.locator);

const uhrPlugin = require('catberry-uhr');
uhrPlugin.register(cat.locator);

// starts the application when DOM is ready
cat.startWhenReady();