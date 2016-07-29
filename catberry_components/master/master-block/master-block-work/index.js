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
            if (!data) return;
            //console.log(data);
            // проверяем редактировали ли мы данные
            if (!data.isEdit) {
                var tempArr = ['', '', '', '', '', '', ''];
                if (data.schedule) {
                    data.schedule.forEach(function (item) {
                        if (item) {
                            item.open = item.open.substr(0, 5);
                            item.close = item.close.substr(0, 5);
                        }
                        tempArr[item.day - 1] = item;
                    });
                    data.schedule = tempArr;
                    //console.log(data.schedule);
                }
                if (data.workCondition && data.workCondition.data && data.workCondition.data.length != 0) {
                    if (data.workCondition.data.comming) {
                        data.workCondition.data.comming = data.workCondition.data.comming.split(',');
                    }
                    data.workCondition.data.isActive = (data.workCondition.data.payment || data.workCondition.data.coop);
                }
                data.isEdit = true;
            }
            var days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
            var dayOfWeek = new Date().getDay();
            dayOfWeek == 0 ? dayOfWeek = 6 : dayOfWeek = dayOfWeek - 1;

            //console.log(data.workCondition);
            return {
                days: days,
                dayOfWeek: dayOfWeek,
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
