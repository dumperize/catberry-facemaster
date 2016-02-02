'use strict';

module.exports = MasterBlockService;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-block-service" component.
 * @constructor
 */
function MasterBlockService() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockService.prototype.render = function () {
    if (this.$context.attributes['master-page']) {
        return this.$context.getStoreData()
            .then(function (data) {
                if (data.services.length > data.page.services) {
                    data.services.length = data.page.services; //укорачиваем массив услуг до значения page.services
                }
                //console.log(data.services);
                var fieldsValSum = 0;
                var fieldsValHalfSum = 0;
                var part1 = [];
                var part2 = [];

                data.services.forEach(function (item) {
                    var fieldsValLength;

                    fieldsValLength = item.length;
                    if (fieldsValLength < 20) {
                        fieldsValLength = 20;
                    }
                    fieldsValSum += fieldsValLength;
                });
                data.services.forEach(function (item) {
                    var fieldsValLength;

                    fieldsValLength = item.length;
                    if (fieldsValHalfSum < (fieldsValSum / 2) - 9) {
                        part1.push(item);
                    } else {
                        part2.push(item);
                    }
                    fieldsValHalfSum += fieldsValLength;
                });
                data.services = [];
                data.services.part1 = part1;
                data.services.part2 = part2;
                return {
                    services: data.services
                }
            });
    }
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockService.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterBlockService.prototype.unbind = function () {

};
