'use strict';

module.exports = KonkursMember;
var Typograf = require('typograf');

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "konkurs-member" component.
 * @constructor
 */
function KonkursMember() {
    this.tp = new Typograf({lang: 'ru'});
}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
KonkursMember.prototype.render = function () {
    var self = this;

    return this.$context.getStoreData()
        .then(function(data){
            data.sort(function (a, b) {
                if (a.countHits.countHits > b.countHits.countHits) return 1;
                if (a.countHits.countHits < b.countHits.countHits) return -1;
            });
            data.forEach(function (item) {
               item.description = self.tp.execute(item.description);
                //console.log(item);
            });
            return data;
        })
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
KonkursMember.prototype.bind = function () {
    $('.member-cont a').bind('click', showMemberImg);
    $('.vote-cont__btn').bind('click', vote);

    function showMemberImg() {
        var arrImg = $(this).closest('.member-cont').find('a');
        var workTitle = $(this).find('img').attr('alt');
        $.fancybox(arrImg, {
            type: 'image',
            prevEffect: 'none',
            nextEffect: 'none',
            title: workTitle,
            minWidth: '250px',
            helpers: {
                title: {
                    type: 'inside'
                },
                thumbs: {
                    width: 80,
                    height: 80
                }
            }
        });
        return false;
    }
    function vote() {
        $('.vote-cont__btn').hide();
        $('.vote-cont__info').fadeIn(400);
        return false;
    }
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
KonkursMember.prototype.unbind = function () {
    $('.member-cont a').unbind('click');
};
