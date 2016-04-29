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
KonkursMember.prototype.konkursID = null;
/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
KonkursMember.prototype.render = function () {
    var self = this;
    var status = this.$context.attributes['status'];

    return this.$context.getStoreData()
        .then(function (data) {
            if (status == 'end-yet') {
                data.sort(function (a, b) {
                    return b.countHits.countHits - a.countHits.countHits;
                });
            } else {
                data.sort(function (a, b) {
                    if (Math.random() < .5) return -1; else return 1;
                });
            }

            data.forEach(function (item) {
                item.description = self.tp.execute(item.description);
                //console.log(item);
            });
            data.status = status;
            return data;
        })
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
KonkursMember.prototype.bind = function () {
    this.konkursID = this.$context.attributes['konkurs-id'];

    $('.member-cont a').bind('click', showMemberImg);

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

    return {
        click: {
            '.vote-cont__btn': this.handleVote
        }
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

KonkursMember.prototype.handleVote = function (event) {
    event.preventDefault();
    event.stopPropagation();
    var self = this;
    var target = event.target;
    var id = $(target).attr('data-id');
    $('.vote-cont__btn').hide();
    $('.vote-cont__info').fadeIn(400);
    this.$context.sendAction('vote', {
        konkursID: self.konkursID,
        memberID: id
    })
        .then(function (data) {

            if (!data.success) {
                var error = '';
                data.error.forEach(function (el) {
                    error += el.message;
                });
                alert(error);
            } else {
                var el = self.$context.getComponentById('konkurs-member-vote-' + id);
                var attr = el.render();
                attr.counthits++;
                attr.id += '-new';
                attr.status = 'end-yet';
                self.$context.createComponent('konkurs-member-vote', attr)
                    .then(function (dom) {
                        self.$context.element.querySelector('#konkurs-member-vote-' + id).innerHTML = dom.innerHTML;
                    });
            }
        });
};