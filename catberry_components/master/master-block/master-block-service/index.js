'use strict';

module.exports = MasterBlockService;
//var Typograf = require('typograf');

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
    //this.tp = new Typograf({lang: 'ru'});
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockService.prototype.render = function () {
    var self = this;

    return this.$context.getStoreData()
        .then(function (data) {
            if (data.services.length > data.publication.services) {
                data.services.length = data.publication.services; //укорачиваем массив услуг до значения page.services
            }
            //console.log(data.services);
            var fieldsValSum = 0;
            var fieldsValHalfSum = 0;
            var part1 = [];
            var part2 = [];
            var uppercaseCount = 0;


            Object.keys(data.services).forEach(function (item) {
                var fieldsValLength;

                data.services[item] = data.services[item].replace(/:|\.|,/g, '$& ');
                var match = data.services[item].match(/А/g);
                uppercaseCount += match ? match.length : 0;
                fieldsValLength = data.services[item].length;
                if (0 < fieldsValLength && fieldsValLength < 20) {
                    fieldsValLength = 20;
                }
                fieldsValSum += fieldsValLength;
            });
            //console.log(uppercaseCount);
            Object.keys(data.services).forEach(function (item) {
                var fieldsValLength;

                if (uppercaseCount > 15) {
                    data.services[item] = data.services[item].toLowerCase();
                    data.services[item] = data.services[item].charAt(0).toUpperCase() + data.services[item].slice(1);
                }

                fieldsValLength = data.services[item].length;
                if (fieldsValHalfSum < (fieldsValSum / 2) - 10) {
                    if (fieldsValLength > 0) {
                        //part1.push(self.tp.execute(data.services[item]));
                        part1.push(data.services[item]);
                    }
                } else {
                    if (fieldsValLength > 0) {
                        //part2.push(self.tp.execute(data.services[item]));
                        part2.push(data.services[item]);
                    }
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

};
