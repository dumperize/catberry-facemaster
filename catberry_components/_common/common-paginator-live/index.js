'use strict';

module.exports = CommonPaginatorLive;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "common-paginator-live" component.
 * @constructor
 */
function CommonPaginatorLive() {

}

CommonPaginatorLive.prototype.pageCount = 1;
CommonPaginatorLive.prototype.currentPage = 1;

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
CommonPaginatorLive.prototype.render = function () {
    var self = this;
    var urls = [];
    return this.$context.getStoreData()
        .then(function (data) {
            //console.log(data);
            self.pageCount = data.pageCount || self.$context.attributes['page-count'];
            self.currentPage = data.currentPage || self.$context.attributes['current-page'];
            for (var i = 1; i <= self.pageCount; i++) {
                urls.push({path: '#' + i, currentPage: i, show: false});
                if (7 > self.pageCount || (i > self.currentPage - 4 && i < self.currentPage + 4)) {
                    urls[i - 1].show = true;
                }
            }
            urls[0].path = '#1';
            return {
                urls: urls,
                currentPage: self.currentPage,
                pageCount: self.pageCount
            };
        });
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
CommonPaginatorLive.prototype.bind = function () {
    return {
        click: {
            'a': this._changePage
        }
    }
};

CommonPaginatorLive.prototype._changePage = function (e) {
    e.preventDefault();
    e.stopPropagation();

    //console.log(e.currentTarget.href.match(/^.+#(\d+)/i));
    var elem = this.$context.element;
    var commentCont = $(elem).closest('.comment');
    var match = e.currentTarget.href.match(/^.+#(\d+)/i);
    if (match) {
        this.$context.sendAction('changePage', match[1])
            .then(function () {
                $('html, body').animate({
                    scrollTop: $(commentCont).offset().top - 20
                }, 800);
            });
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
CommonPaginatorLive.prototype.unbind = function () {

};
