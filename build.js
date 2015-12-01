'use strict';

var isRelease = process.argv.length === 3 ?
		process.argv[2] === 'release' : undefined,
	catberry = require('catberry'),
	templateEngine = require('catberry-handlebars'),
	beml = require('catberry-beml'),
	cat = catberry.create({
		isRelease: isRelease
	});

beml.register(cat.locator);
templateEngine.register(cat.locator);
cat.build();
