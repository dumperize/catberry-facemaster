'use strict';

module.exports = MasterFilter;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-filter" component.
 * @constructor
 */
function MasterFilter() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterFilter.prototype.render = function () {
    var self = this;
    var path, currentTag, currentSection;
    var result = [];

    return this.$context.getStoreData()
        .then(function (rubrika) {

            path = '/' + rubrika.parent.english + '/' + rubrika.english;
            currentTag = rubrika.currentTag;

            return self.$context.getStoreData('master/MasterList')
                .then(function (master) {
                    if (Object.keys(master).length > 0)
                        result.push({
                            url: path,
                            sectionName: "masters",
                            title: "Мастера"
                        });
                })
                .then(function () {
                    return self.$context.getStoreData('master/MasterVideo')
                })
                .then(function (video) {
                    //if (Object.keys(master).length > 0)
                    result.push({
                        url: path + '/video',
                        sectionName: "video",
                        title: "Видео Мастеров"
                    });
                })
                .then(function () {
                    //return self.$context.getStoreData('master/MasterVideo')
                })
                .then(function (sales) {
                    //if (Object.keys(master).length > 0)
                    result.push({
                        url: path + '/sales',
                        sectionName: "sales",
                        title: "Скидки Мастеров"
                    });
                })
                .then(function () {
                    //return self.$context.getStoreData('master/MasterVideo')
                })
                .then(function (secrets) {
                    //if (Object.keys(master).length > 0)
                    result.push({
                        url: path + '/secrets',
                        sectionName: "secrets",
                        title: "Секреты Мастеров"
                    });
                })
                .then(function () {
                    //return self.$context.getStoreData('master/MasterVideo')
                })
                .then(function (company) {
                    //if (Object.keys(master).length > 0)
                    result.push({
                        url: path + '/company',
                        sectionName: "company",
                        title: "Каталог фирм"
                    });
                })
                .then(function () {
                    self._decoreOpenSection(result, rubrika);
                    return {filterSection: result};
                })
        });
};
/**
 * Декарирование открытой секции (добавление тегов, ортировки)
 * @param currentSection текущая секция
 * @param result массив для декорирования
 * @param rubrika рубрика из стора
 * @private
 */
MasterFilter.prototype._decoreOpenSection = function (result, rubrika) {
    var currentSection = rubrika.currentSection;

    for (var i = 0; i < result.length; ++i) {
        if (result[i].sectionName == currentSection) {

            var tags = this._getTags(rubrika);
            result[i].openSection = {tagsGroup: tags};

            if (currentSection == 'master') {
                result[i].sortBy = {
                    "url": "",
                    "method": "get"
                };
            }

            return;
        }
    }
};

/**
 * Перестройка тегов
 * @param tagsJson тэги из json
 * @param path абсолютный родительский путь для ссылок в тегах
 * @param currentTag текущий тег для выделения
 * @returns {Array} теги разбитые по группам
 * @private
 */
MasterFilter.prototype._getTags = function (rubrika) {
    var path = '/' + rubrika.parent.english + '/' + rubrika.english;
    var tagsJson = rubrika.tags;
    var currentTag = rubrika.currentTag;
    var currentSection = rubrika.currentSection;
    var tags = [];

    Object.keys(tagsJson)
        .forEach(function (n) {
            var tag = tagsJson[n];

            if (!tags[tag.groupName])
                tags[tag.groupName] = [];

            if (tag.url == currentTag) {
                tag.isActive = true;
                tag.urlBack = path;
            }

            if (currentSection == 'masters') {
                tag.url = path + '/' + tag.url;
            } else {
                tag.url = path + '/' + tag.url + '/' + currentSection;
            }

            tags[tag.groupName].push(tag);
        });

    //сортируем
    var tagsGroup = [];
    Object.keys(tags).sort().forEach(function (key) {
        tagsGroup.push({
            title: key,
            tags: tags[key]
        });
    });

    return tagsGroup;
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterFilter.prototype.bind = function () {
    return {
        click: {
            '.js-filter-toggle-btn.active': this._clickSection
        }
    }
};

MasterFilter.prototype._clickSection = function (obj) {
    var dom = obj.target;
    var el;
    if (!($(dom).hasClass('js-filter-toggle-btn') && $(dom).hasClass('active')))
        el = $(dom).parents('.js-filter-toggle-btn');
    else
        el = $(dom);
    el.parent().find('.js-filter-toggle-section').slideToggle();
    el.find('.filter-section__arrow-icon').toggleClass('down');
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterFilter.prototype.unbind = function () {

};
