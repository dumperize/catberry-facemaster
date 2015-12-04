'use strict';

var isRelease = process.argv.length === 3 ?
		process.argv[2] === 'release' : undefined,
	catberry = require('catberry'),
	templateEngine = require('./special_modules/catberry-handlebars'),
	fmGulp = require('./special_modules/catberry-fm-gulp'),
	cat = catberry.create({
		isRelease: isRelease
	});

fmGulp.register(cat.locator);
templateEngine.register(cat.locator);
cat.build();
