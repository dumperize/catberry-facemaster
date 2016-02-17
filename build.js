'use strict';

var isRelease = process.argv.length === 3 ?
		process.argv[2] === 'release' : undefined,
	catberry = require('catberry'),
	templateEngine = require('fm-hbs'),
	fmGulp = require('fm-catberry-walle'),
	cat = catberry.create({
		isRelease: isRelease
	});

fmGulp.register(cat.locator);
templateEngine.register(cat.locator);
cat.build();
