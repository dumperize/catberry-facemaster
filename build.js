'use strict';

// configuration
const isRelease = process.argv.length === 3 ?
	process.argv[2] === 'release' : undefined;

// catberry application
const catberry = require('catberry');
const cat = catberry.create({isRelease});

// register Catberry plugins needed for building process
const templateEngine = require('fm-catberry-handlebars');
templateEngine.register(cat.locator);

const logger = require('catberry-logger');
logger.register(cat.locator);

const fmGulp = require('fm-catberry-walle');
fmGulp.register(cat.locator, isRelease);

// run the build
cat.build();

