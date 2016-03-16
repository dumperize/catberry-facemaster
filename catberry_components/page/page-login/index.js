'use strict';

module.exports = PageLogin;
var ComponentForm = require("../../../lib/ComponentForm");

var util = require('util');
util.inherits(PageLogin, ComponentForm);
/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-login" component.
 * @constructor
 */
function PageLogin() {
    ComponentForm.call(this);

    this.formID = '#login-form';
}
