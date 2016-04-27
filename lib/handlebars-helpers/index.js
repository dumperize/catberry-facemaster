'use strict';

var digits = require('digits');

var Dates = require('./utils/dates');
var Utils = require('./utils/utils');

module.exports = function (Handlebars) {

    return {
        /**
         * Repeat  helper
         * @param  {Number} n       number of iterations
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        repeat: function (n, options) {
            options = options || {};
            var _data = {},
                content = '',
                count = n - 1;

            if (options._data) {
                _data = Handlebars.createFrame(options._data);
            }

            for (var i = 0; i <= count; i++) {
                _data = {
                    index: digits.pad((i + 1), {auto: n})
                };
                content += options.fn(this, {data: _data});
            }
            return new Handlebars.SafeString(content);
        },

        /**
         * If helper with params
         * @param  {[type]} a        [description]
         * @param  {[type]} b        [description]
         * @param  {String} options  operation
         * @return {[type]}          [description]
         */
        is: function (leftOperand, operation, rightOperand, options) {
            var a = leftOperand || false,
                b = rightOperand || false;

            if (operation && typeof operation === 'string') {
                switch (operation) {

                    // Not strictly equal
                    case '==':
                        if (a == b) {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        }
                        break;

                    // Strictly equal
                    case '===':
                        if (a === b) {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        }
                        break;

                    // a > b checking
                    case '>':
                        if (a > b) {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        }
                        break;

                    // a >= b checking
                    case '>=':
                        if (a >= b) {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        }
                        break;

                    // a < b checking
                    case '<':
                        if (a < b) {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        }
                        break;

                    // a <= b checking
                    case '<=':
                        if (a <= b) {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        }
                        break;

                    // Action, if operation is unknown
                    default:
                        throw new Error(
                            'Operation is unknown!\n"is" helper supports only:\n' +
                            '"==",\n' +
                            '"===",\n' +
                            '">",\n' +
                            '">=",\n' +
                            '"<",\n' +
                            '"<=",\n'
                        );
                }
            } else {
                throw new Error('Operation have to be recived and have to be a string');
            }

        },

        /**
         * Str to lower case
         * @param  {String} str [description]
         * @return {[type]}     [description]
         */
        toLowerCase: function (str) {
            if (typeof str != 'string') {
                str.toString();
            }

            return str.toLowerCase();
        },

        /**
         * Str to upper case
         * @param  {String} str [description]
         * @return {[type]}     [description]
         */
        toUpperCase: function (str) {
            if (typeof str != 'string') {
                str.toString();
            }

            return str.toUpperCase();
        },

        /**
         * Capitalize first symbol of str
         * @param  {String} str [description]
         * @return {[type]}     [description]
         */
        capitalizeFirst: function (str) {
            if (typeof str != 'string') {
                str.toString();
            }

            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        /**
         * Remove whitespaces from recived data to helper
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        strip: function (options) {
            options = options || {};

            var _data = {},
                content = '';

            if (options._data) {
                _data = Handlebars.createFrame(options._data);
            }

            content = options.fn(this, {data: _data}).replace(/>(\s+)</g, '><');

            return new Handlebars.SafeString(content);
        },

        stripTags: function (str) {
            if (str) {
                str = str.replace(/<!--[^]*-->/g, '');
                return str.replace(/<\/?[^>]+>/gi, '');
            }
        },

        stripStyle: function (str) {
            return str.replace(/ style="[^"]*"/g, '')
        },

        /**
         * {{formatData}}
         * Port of formatDate-js library (http://bit.ly/18eo2xw)
         * @param  {[type]} date   [description]
         * @param  {[type]} format [description]
         * @return {[type]}        [description]
         */
        formatDate: function (date, format) {
            date = new Date(date);
            return Dates.format(date, format);
        },

        /**
         * {{now}}
         * @param  {[type]} format [description]
         * @return {[type]}        [description]
         */
        now: function (format) {
            var date = new Date();
            if (Utils.isUndefined(format)) {
                return date;
            } else {
                return Dates.format(date, format);
            }
        },

        /**
         * {{i18n}}
         * @author: Laurent Goderre <https://github.com/LaurentGoderrre>
         * @param  {String} context
         * @param  {Object} options
         * @return {String}
         * @example: <https://github.com/assemble/buttons> (See the "button-i18n" example)
         */
        i18n: function (context, options) {
            var language = void 0;

            if (typeof context !== 'string') {
                throw 'Key must be of type \'string\'';
            }

            language = (typeof options.hash.language === 'string' ? options.hash.language : this.language);

            if (typeof language === 'undefined') {
                throw 'The \'language\' parameter is not defined';
            }

            if (typeof this[language] === "undefined") {
                throw 'No strings found for language \'" + language + "\'';
            }

            if (typeof this[language][context] === "undefined") {
                throw 'No string for key \'" + context + "\' for language \'" + language + "\'';
            }

            return this[language][context];
        },
        icon: function (name, selector, sys) {
            var cl = 'icon icon_' + name;

            if (typeof selector == "string") {
                cl += " " + selector;
            }

            return new Handlebars.SafeString(
                '<svg role="img" title="icon_' + name + '" class="' + cl + '">' +
                '<use xlink:href="/icon-svg/svg-symbols.svg#icon_' + name + '"></use>' +
                '</svg>'
            );
        },
        imgSrc: function (imgId, width, height, sys) {
            var imgSrc = 'http://files.facemaster.ru/index.php?key=' + imgId;
            var typeWidth = typeof width;
            var typeHeight = typeof height;
            var widthNumber = (typeof width) == "number";
            var heightNumber = (typeof height) == "number";

            //console.log(typeWidth, typeHeight, widthNumber, heightNumber);

            if (widthNumber && heightNumber && (width == height)) {
                imgSrc = imgSrc + '&square=' + height;
            } else {
                if ((typeWidth != "undefined") && heightNumber) {
                    imgSrc = imgSrc + '&width=' + width;
                }
                if ((typeHeight != "undefined") && heightNumber) {
                    imgSrc = imgSrc + '&height=' + height;
                }
            }
            //console.log(imgSrc);
            return new Handlebars.SafeString(imgSrc);
        },
        getNumEnding: function (iNumber, aEndings) {
            var sEnding, i, iTmp;
            if (typeof(iNumber) === "undefined") return false;

            aEndings = aEndings.split(', ');
            iTmp = iNumber % 100;
            if (iTmp >= 11 && iTmp <= 19) {
                sEnding = aEndings[2];
            }
            else {
                i = iTmp % 10;
                switch (i) {
                    case (1):
                        sEnding = aEndings[0];
                        break;
                    case (2):
                    case (3):
                    case (4):
                        sEnding = aEndings[1];
                        break;
                    default:
                        sEnding = aEndings[2];
                }
            }
            return new Handlebars.SafeString(iNumber + ' ' + sEnding);
        }
    };
};