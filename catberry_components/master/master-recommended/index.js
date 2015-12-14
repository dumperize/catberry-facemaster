'use strict';

module.exports = MasterRecommended;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-recommended" component.
 * @constructor
 */
function MasterRecommended() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterRecommended.prototype.render = function () {
    //return this.$context.getStoreData();
    return {
        "is-recommended-masters": true,
        "url-arrow-left": "404",
        "url-arrow-right": "404",
        "recommended-master": [
            {
                "master-url": "404",
                "src": "/img/assets/master_recommended/3720.jpg",
                "alt": "Князев А.Ю.",
                "master-name": "Князев А.Ю.",
                "recommendation-number": "27 человек"
            },
            {
                "master-url": "404",
                "src": "/img/assets/master_recommended/4617.jpg",
                "alt": "Хальзов А.",
                "master-name": "Хальзов А.",
                "recommendation-number": "6 человек"
            },
            {
                "master-url": "404",
                "src": "/img/assets/master_recommended/7428.jpg",
                "alt": "Булгаков В.А.",
                "master-name": "Булгаков В.А.",
                "recommendation-number": "5 человек"
            },
            {
                "master-url": "404",
                "src": "/img/assets/master_recommended/3720.jpg",
                "alt": "Князев А.Ю.",
                "master-name": "Князев А.Ю.",
                "recommendation-number": "27 человек"
            },
            {
                "master-url": "404",
                "src": "/img/assets/master_recommended/4617.jpg",
                "alt": "Хальзов А.",
                "master-name": "Хальзов А.",
                "recommendation-number": "6 человек"
            },
            {
                "master-url": "404",
                "src": "/img/assets/master_recommended/7428.jpg",
                "alt": "Булгаков В.А.",
                "master-name": "Булгаков В.А.",
                "recommendation-number": "5 человек"
            },
            {
                "master-url": "404",
                "src": "/img/assets/master_recommended/3720.jpg",
                "alt": "Князев А.Ю.",
                "master-name": "Князев А.Ю.",
                "recommendation-number": "27 человек"
            },
            {
                "master-url": "404",
                "src": "/img/assets/master_recommended/4617.jpg",
                "alt": "Хальзов А.",
                "master-name": "Хальзов А.",
                "recommendation-number": "6 человек"
            },
            {
                "master-url": "404",
                "src": "/img/assets/master_recommended/7428.jpg",
                "alt": "Булгаков В.А.",
                "master-name": "Булгаков В.А.",
                "recommendation-number": "5 человек"
            }
        ]
    }
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterRecommended.prototype.bind = function () {
    this.bindSlick();
};

/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterRecommended.prototype.unbind = function () {
    this.unbindSlick();
};

MasterRecommended.prototype.bindSlick = function () {
    $('.master_recommended__slider').slick({
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 3,
        prevArrow: '<div class="slick-prev">' +
        '<svg class="icon icon_strelka" title="icon_strelka" role="img">' +
        '<use xlink:href="/icon-svg/svg-symbols.svg#icon_strelka"/>' +
        '</svg>' +
        '</div>',
        nextArrow: '<div class="slick-next">' +
        '<svg class="icon icon_strelka" title="icon_strelka" role="img">' +
        '<use xlink:href="/icon-svg/svg-symbols.svg#icon_strelka"/>' +
        '</svg>' +
        '</div>'
    });
};
MasterRecommended.prototype.unbindSlick = function () {
    $('.master_recommended__slider').slick("unslick");
};