'use strict';

module.exports = MasterNextPrev;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-next-prev" component.
 * @constructor
 */
function MasterNextPrev() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterNextPrev.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            //console.log(data);
            if (data.prev) {
                data.prev.name = data.prev.name.replace(/ /g, "<br>");
            }
            if (data.next) {
                data.next.name = data.next.name.replace(/ /g, "<br>");
            }
            return data;
        });
};
