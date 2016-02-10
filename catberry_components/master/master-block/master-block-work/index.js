'use strict';

module.exports = MasterBlockWork;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-block-work" component.
 * @constructor
 */
function MasterBlockWork() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockWork.prototype.render = function () {
    return this.$context.getStoreData()
        .then(function (data) {
            var tempArr = new Array(7);
            data.schedule.forEach(function (item) {
                item.open = item.open.substr(0, 5);
                item.close = item.close.substr(0, 5);
                tempArr[item.day - 1] = item;
            });
            data.schedule = tempArr;
            //console.log(data.workCondition);
            if (data.workCondition.data != '') {
                data.workCondition.data.comming = data.workCondition.data.comming.split(',');
            }
            return {
                schedule: data.schedule,
                districts: data.districts,
                workCondition: data.workCondition ? data.workCondition.data : ''
            }
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockWork.prototype.bind = function () {

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterBlockWork.prototype.unbind = function () {

};
