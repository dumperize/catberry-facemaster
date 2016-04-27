'use strict';

module.exports = KonkursMemberVote;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "konkurs-member-vote" component.
 * @constructor
 */
function KonkursMemberVote() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
KonkursMemberVote.prototype.render = function () {
    return this.$context.attributes;
};

KonkursMemberVote.prototype.getCounthit = function() {
    return this.$context.attributes['counthits'];
};