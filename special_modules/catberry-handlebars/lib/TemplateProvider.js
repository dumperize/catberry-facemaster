/*
 * catberry-handlebars
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry-handlebars's license follows:
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This license applies to all parts of catberry-handlebars that are not
 * externally maintained libraries.
 */

'use strict';
var beml = require('beml');
var configBeml = {
  elemPrefix: '__',
  modPrefix: '_',
  modDlmtr: '_'
};

module.exports = TemplateProvider;

var BrowserTemplateProvider = require('../browser/TemplateProvider'),
	util = require('util');

util.inherits(TemplateProvider, BrowserTemplateProvider);

function TemplateProvider($handlebars) {
	BrowserTemplateProvider.call(this, $handlebars);
}

/**
 * Compiles (precompiles) Handlebars template.
 * http://handlebarsjs.com/reference.html
 * @param {string} source Template source.
 * @returns {string} Precompiled source (template specification).
 */
TemplateProvider.prototype.compile = function (source) {
	var source = beml(source, configBeml);
	return this._handlebars.precompile(source);
};
