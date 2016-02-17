/**
 * Handlebars Helpers: Utils
 * http://github.com/assemble/handlebars-helpers
 * Copyright (c) 2013, 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
'use strict';

module.exports = {
    isUndefined: function (value) {
        return typeof value === 'undefined' || value.toString() === '[object Function]' || (value.hash != null);
    }
};
