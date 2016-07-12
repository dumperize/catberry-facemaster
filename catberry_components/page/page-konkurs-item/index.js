'use strict';

module.exports = PageKonkursItem;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "page-konkurs-item" component.
 * @constructor
 */
function PageKonkursItem() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PageKonkursItem.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            //console.log(data);
            switch (data.konkursStatus) {
                case '0':
                    data.statusMember = 'not-start';
                    break;
                case '1':
                    data.statusMember = 'reception';
                    break;
                case '2':
                    data.statusMember = 'vote';
                    break;
                case '3':
                    data.statusMember = 'end-yet';
                    break;
            }
            return data;
        })
};
PageKonkursItem.prototype.getDate = function (d) {
    var splitDate = d.split('.');
    return new Date(splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0]);
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PageKonkursItem.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
PageKonkursItem.prototype.unbind = function () {

};
