/*
 * catberry-l10n-handlebars-helper
 *
 * Copyright (c) 2015 Denis Rechkunov and project contributors.
 *
 * catberry-l10n-handlebars-helper's license follows:
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
 * This license applies to all parts of catberry-l10n-handlebars-helper that
 * are not externally maintained libraries.
 */

'use strict';

module.exports = LocalizationHelper;

/**
 * Creates new instance of localization helper.
 * @param {LocalizationProvider} $localizationProvider Localization provider.
 * @constructor
 */
function LocalizationHelper($localizationProvider) {
	this._localizationProvider = $localizationProvider;
}

/**
 * Current localization provider.
 * @type {LocalizationProvider}
 * @private
 */
LocalizationHelper.prototype._localizationProvider = null;

/**
 * Gets handlebars helper for localization.
 * @returns {Function} Handlebars helper function.
 */
LocalizationHelper.prototype.getHandlebarsHelper = function () {
	return function () {
		var key = null,
			locale = null,
			count = null,
			options = arguments[arguments.length - 1];

		Array.prototype.every.call(arguments, function (arg) {
			if (!key && typeof (arg) === 'string') {
				key = arg;
				return true;
			}
			if (!locale && typeof (arg) === 'string') {
				locale = arg;
				return true;
			}
			if (!count && typeof (arg) === 'number') {
				count = arg;
				return true;
			}
			return false;
		});

		if (!key) {
			return '';
		}

		if (!locale) {
			locale = options.data.root.locale;
		}

		var value = '';
		try {
			value = !isNaN(count) ?
				this._localizationProvider.pluralize(locale, key, count) :
				this._localizationProvider.get(locale, key);
		} catch (e) {
			// nothing to do
		}

		return value;
	}.bind(this);
};