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
    var tags, tagsGroup, path;
    var result = {filterSection: []};

    return this.$context.getStoreData()
        .then(function (rubrika) {

            tags = self._getTags(rubrika.tags);
            tagsGroup = self._getTagsGroup(tags);
            path = '/' + rubrika.parent.english + '/' + rubrika.english;

            return self.$context.getStoreData('master/MasterList')
                .then(function (master) {
                    if (Object.keys(master).length > 0)
                        result.filterSection.push({
                            url: path,
                            sectionName: "masters",
                            title: "Мастера",
                            openSection: {
                                sortBy: {
                                    "url": "",
                                    "method": "get"
                                },
                                tagsGroup: tagsGroup
                            }
                        });
                })
                .then(function () {
                    return self.$context.getStoreData('master/MasterVideo')
                })
                .then(function (video) {
                    //if (Object.keys(master).length > 0)
                    result.filterSection.push({
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
                    result.filterSection.push({
                        url: path + '/sale',
                        sectionName: "sales",
                        title: "Скидки Мастеров"
                    });
                })
                .then(function () {
                    //return self.$context.getStoreData('master/MasterVideo')
                })
                .then(function (secrets) {
                    //if (Object.keys(master).length > 0)
                    result.filterSection.push({
                        url: path + '/secret',
                        sectionName: "secrets",
                        title: "Секреты Мастеров"
                    });
                })
                .then(function () {
                    //return self.$context.getStoreData('master/MasterVideo')
                })
                .then(function (company) {
                    //if (Object.keys(master).length > 0)
                    result.filterSection.push({
                        url: path + '/company',
                        sectionName: "company",
                        title: "Каталог фирм"
                    });
                })
                .then(function () {
                    return result;
                })
        });
};

MasterFilter.prototype._getTags = function (tagsJson) {
    var tags = [];
    Object.keys(tagsJson)
        .forEach(function (n) {
            var tag = tagsJson[n];
            if (!tags[tag.groupName])
                tags[tag.groupName] = [];

            tags[tag.groupName].push(tag);
        });
    return tags;
};

MasterFilter.prototype._getTagsGroup = function (tags) {
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

};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterFilter.prototype.unbind = function () {

};
