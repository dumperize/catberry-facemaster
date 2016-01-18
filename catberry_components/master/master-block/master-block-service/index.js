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
                //console.log(data);
                data.services = [
                    'Эксперт по развитию (комфортных, надежных, благополучных, доверительных) семейных отношений',
                    'Психологическое сопровождение семьи от ЗАГСа и по жизни',
                    'Психология семейных отношений',
                    'Психотерапия (индивидуальная и групповая)',
                    'Личные проблемы – беспокойства и страхи, неуверенность в себе, депрессия',
                    'Одиночество, не складывается личная жизнь',
                    'Проблемы в общении – сложности во взаимоотношениях, непонимание',
                    'Психосоматические расстройства у детей и взрослых',
                    'Зависимость (алкогольная, никотиновая, игровая и т.д.)',
                    'Повышенная конфликтность, конфликты на работе и не только',
                    'Психология детско-родительских отношений',
                    'Психодиагностика',
                    'Финансовое благополучие семьи – деньги и семейные конфликты, мои взаимоотношения с деньгами, развитие финансовой грамотности, финансовый диагноз',
                    'Организационная психология и бизнес-тренинги',
                    'Вопросы воспитания и развития',
                    'Психологическое консультирование',
                    'Индивидуальная психотерапия',
                    'Групповая психотерапия',
                    'Детско-родительские отношения',
                    'Проблемы семейных отношений',
                    'Проблемы взаимоотношений',
                    'Личностные проблемы',
                    'Психосоматические расстройства',
                    'Экзистенциальные вопросы',
                    'Работа со снами и мифами'
                ];
                var fieldsValSum = 0;
                var fieldsValHalfSum = 0;
                var part1 = [];
                var part2 = [];

                data.services.forEach(function (item, i, arr) {
                    //var fieldsValHalfSum = 0;
                    var fieldsValLength;

                    fieldsValLength = item.length;
                    if (fieldsValLength < 30) {
                        fieldsValLength = 30;
                    }
                    fieldsValSum += fieldsValLength;
                });
                data.services.forEach(function (item, i, arr) {
                    var fieldsValLength;

                    fieldsValLength = item.length;
                    if (fieldsValHalfSum < fieldsValSum / 2) {
                        part1.push(item);
                    } else {
                        part2.push(item);
                    }
                    fieldsValHalfSum += fieldsValLength;
                });
                data.services = [];
                data.services.part1 = part1;
                data.services.part2 = part2;
                //console.log(data.services);
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
