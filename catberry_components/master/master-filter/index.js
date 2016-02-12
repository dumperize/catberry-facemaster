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
    var path, currentTag;
    var result = [];

    return this.$context.getStoreData()
        .then(function (data) {
            path = '/' + data.rubrika.parent.unique + '/' + data.rubrika.unique;

            return self.$context.getStoreData('master/MasterList')
                .then(function (master) {
                    result = self._setSection(path);
                    self._decoreOpenSection(result, data);
                    return {filterSection: result};
                })
        });
};

MasterFilter.prototype._setSection = function (path) {
    return [
        {
            url: path,
            sectionName: "master",
            title: "Мастера",
            ico: "man"
        },
        {
            url: path + '/video',
            sectionName: "video",
            title: "Видео Мастеров",
            ico: "video"
        },
        {
            url: path + '/sale',
            sectionName: "sale",
            title: "Скидки Мастеров",
            ico: "gift"
        },
        {
            url: path + '/sovety',
            sectionName: "sovety",
            title: "Секреты Мастеров",
            ico: "qwestion"
        },
        {
            url: path + '/company',
            sectionName: "company",
            title: "Каталог фирм",
            ico: "case"
        }
    ];
};

/**
 * Декарирование открытой секции (добавление тегов, ортировки)
 * @param result массив для декорирования
 * @param rubrika рубрика из стора
 * @private
 */
MasterFilter.prototype._decoreOpenSection = function (result, data) {
    var currentSection = data.section;

    for (var i = 0; i < result.length; ++i) {
        if (result[i].sectionName == currentSection) {

            var tags = this._getTags(data);
            result[i].openSection = {tagsGroup: tags};
            if (currentSection == 'masters') {
                result[i].openSection.sortBy = {
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
MasterFilter.prototype._getTags = function (data) {
    var path = '/' + data.rubrika.parent.unique + '/' + data.rubrika.unique;
    var tagsJson = data.rubrika.tags;
    var currentTag = data.tag.unique;
    var currentSection = data.section;
    var tags = [];

    Object.keys(tagsJson)
        .forEach(function (n) {
            var tag = tagsJson[n];
            tag.isActive = false;

            if (!tags[tag.group])
                tags[tag.group] = [];

            if (tag.unique == currentTag) {
                tag.isActive = true;
                tag.urlBack = path;
            }
            if (currentSection == 'master') {
                tag.path = path + '/' + tag.unique;
            } else {
                tag.path = path + '/' + tag.unique + '/' + currentSection;
            }

            tags[tag.group].push(tag);
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
    this.$context.sendAction('getSections')
        .then(function (data) {
            //console.log(data);
            var allFilters = ['video', 'sale', 'company', 'master', 'sovety'];
            if (data) {
                allFilters.forEach(function (item) {
                    if (data.toString().indexOf(item) < 0) {
                        $('.filter-section__title_' + item).parent().hide();
                    }
                });
            }
        });

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
