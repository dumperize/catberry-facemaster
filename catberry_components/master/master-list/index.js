'use strict';

module.exports = MasterList;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-list" component.
 * @constructor
 */
function MasterList() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterList.prototype.render = function () {
    //return this.$context.getStoreData();
    return [
        {
            "id": 1003,
            "userID": 20682,
            "rubrikaID": 11,
            "sort": 495,
            "name": "Коваленко Виталий",
            "imgID": null,
            "services": "[\"\u0420\u0435\u043c\u043e\u043d\u0442 \u0438\u043c\u043f\u043e\u0440\u0442\u043d\u044b\u0445 \u0441\u0442\u0438\u0440\u0430\u043b\u044c\u043d\u044b\u0445 \u043c\u0430\u0448\u0438\u043d\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u043e\u0442\u0435\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0445 \u0441\u0442\u0438\u0440\u0430\u043b\u044c\u043d\u044b\u0445 \u043c\u0430\u0448\u0438\u043d\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u043c\u0438\u043a\u0440\u043e\u0432\u043e\u043b\u043d\u043e\u0432\u044b\u0445 \u043f\u0435\u0447\u0435\u0439\",\"\u0417\u0430\u043f\u0430\u0441\u043d\u044b\u0435 \u0447\u0430\u0441\u0442\u0438 \u043d\u0430 \u0441\u0442\u0438\u0440\u0430\u043b\u044c\u043d\u044b\u0435 \u043c\u0430\u0448\u0438\u043d\u044b \u0432 \u043d\u0430\u043b\u0438\u0447\u0438\u0438 \u0438 \u043d\u0430 \u0437\u0430\u043a\u0430\u0437 ( \u043d\u0430\u0441\u043e\u0441\u044b, \u0422\u042d\u041d\u044b, \u043f\u043e\u0434\u0448\u0438\u043f\u043d\u0438\u043a\u0438, \u0440\u0435\u043c\u043d\u0438, \u0441\u0430\u043b\u044c\u043d\u0438\u043a\u0438, \u0440\u0443\u0447\u043a\u0438 \u043b\u044e\u043a\u0430 \u0438 \u0442.\u0434.)\",\"\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0430 \u0438 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u0441\u0442\u0438\u0440\u0430\u043b\u044c\u043d\u044b\u0445 \u043c\u0430\u0448\u0438\u043d\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u0445\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a\u043e\u0432 \u0438 \u043c\u043e\u0440\u043e\u0437\u0438\u043b\u044c\u043d\u044b\u0445 \u043a\u0430\u043c\u0435\u0440\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u043f\u044b\u043b\u0435\u0441\u043e\u0441\u043e\u0432, \u043e\u0431\u043e\u0433\u0440\u0435\u0432\u0430\u0442\u0435\u043b\u0435\u0439\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u0447\u0430\u0439\u043d\u0438\u043a\u043e\u0432, \u0443\u0442\u044e\u0433\u043e\u0432, \u0444\u0435\u043d\u043e\u0432\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u043a\u0443\u0445\u043e\u043d\u043d\u044b\u0445 \u043a\u043e\u043c\u0431\u0430\u0439\u043d\u043e\u0432, \u0431\u043b\u0435\u043d\u0434\u0435\u0440\u043e\u0432\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u0430\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u0432\u0441\u0435\u0433\u043e, \u0447\u0442\u043e \u0432\u043a\u043b\u044e\u0447\u0430\u0435\u0442\u0441\u044f \u0432 \u0440\u043e\u0437\u0435\u0442\u043a\u0443\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u043f\u0443\u043b\u044c\u0442\u043e\u0432 \u0434\u0438\u0441\u0442\u0430\u043d\u0446\u0438\u043e\u043d\u043d\u043e\u0433\u043e \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f, \u0440\u0430\u0434\u0438\u043e\u0442\u0435\u043b\u0435\u0444\u043e\u043d\u043e\u0432\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u044d\u043b\u0435\u0442\u0440\u043e\u043f\u043b\u0438\u0442 \u0438 \u0434\u0443\u0445\u043e\u0432\u043e\u043a\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u0448\u0432\u0435\u0439\u043d\u044b\u0445 \u043c\u0430\u0448\u0438\u043d \u0438 \u043e\u0432\u0435\u0440\u043b\u043e\u043a\u043e\u0432\",\"\u0418 \u0432\u0441\u0435\u0433\u043e, \u0447\u0442\u043e \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0440\u0435\u043c\u043e\u043d\u0442\u0430\"]",
            "spec": "Ремонт стиральных машин, холодильников и прочей бытовой техники",
            "aboutEduc": "Жигулёвский радиотехникум",
            "aboutExp": "25 лет в сфере ремонта бытовой техники",
            "aboutAddInfo": "",
            "publicStatus": 1,
            "publicDateEnd": "2016-07-26",
            "moderStatus": 3,
            "moderComment": "",
            "contacts": {
                "id": 562,
                "ownerType": 1,
                "ownerID": 1003,
                "phone": "9608500622",
                "workPhone": "74-29-70",
                "email": "kovalenko.6974@yandex.ru \t",
                "addr": "",
                "addrCoord": "",
                "skype": "",
                "icq": ""
            },
            "page": {
                "id": 4550,
                "masterID": 1003,
                "transactionID": 0,
                "dateStart": "2015-08-01",
                "dateEnd": "2016-07-26",
                "number": 1003,
                "sales": 1,
                "articles": 0,
                "albums": 1,
                "videos": 0,
                "comments": 1,
                "services": 8,
                "links": 0
            }
        },
        {
            "id": 1005,
            "userID": 20684,
            "rubrikaID": 8,
            "sort": 358,
            "name": "Звездилина Ирина",
            "imgID": null,
            "services": "[\"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0444\u0438\u0440\u043c\",\"\u041b\u0438\u043a\u0432\u0438\u0434\u0430\u0446\u0438\u044f \u0444\u0438\u0440\u043c\",\"\u0411\u0443\u0445\u0433\u0430\u043b\u0442\u0435\u0440\u0441\u043a\u0438\u0435 \u0443\u0441\u043b\u0443\u0433\u0438\",\"\u0417\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u0434\u0435\u043a\u043b\u0430\u0440\u0430\u0446\u0438\u0438\",\"\u0412\u043e\u0437\u0432\u0440\u0430\u0442 \u043d\u0430\u043b\u043e\u0433\u0430 (\u0436\u0438\u043b\u044c\u0435, \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435, \u043b\u0435\u0447\u0435\u043d\u0438\u0435) \/ 3-\u041d\u0414\u0424\u041b\",\"\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0432 \u0443\u0441\u0442\u0430\u0432, \u0433\u043e\u0441. \u0440\u0435\u0435\u0441\u0442\u0440\",\"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0418\u041f\"]",
            "spec": "Бухгалтерские услуги. Регистрация ИП, ООО",
            "aboutEduc": "Высшее экономическое",
            "aboutExp": "4 года",
            "aboutAddInfo": "",
            "publicStatus": 1,
            "publicDateEnd": "2015-12-28",
            "moderStatus": 3,
            "moderComment": "",
            "contacts": {
                "id": 439,
                "ownerType": 1,
                "ownerID": 1005,
                "phone": "365151",
                "workPhone": "",
                "email": "avista-tlt@yandex.ru",
                "addr": "Степана Разина 4А, 3 этаж, оф. 4, Дон",
                "addrCoord": "",
                "skype": "",
                "icq": ""
            },
            "page": {
                "id": 4395,
                "masterID": 1005,
                "transactionID": 0,
                "dateStart": "2015-07-01",
                "dateEnd": "2015-12-28",
                "number": 1005,
                "sales": 0,
                "articles": 0,
                "albums": 0,
                "videos": 0,
                "comments": 1,
                "services": 8,
                "links": 0
            }
        },
        {
            "id": 1006,
            "userID": 20685,
            "rubrikaID": 11,
            "sort": 282,
            "name": "Степанов Вениамин",
            "imgID": null,
            "services": "[\"\u0420\u0435\u043c\u043e\u043d\u0442 \u043e\u0442\u0435\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0445 \u0445\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a\u043e\u0432\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u0438\u043c\u043f\u043e\u0440\u0442\u043d\u044b\u0445 \u0445\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a\u043e\u0432\",\"\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0430 \u0443\u043f\u043b\u043e\u0442\u043d\u0438\u0442\u0435\u043b\u0435\u0439, \u0440\u0435\u0437\u0438\u043d\u044b\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u043e\u0442\u0435\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0445 \u0441\u0442\u0438\u0440\u0430\u043b\u044c\u043d\u044b\u0445 \u043c\u0430\u0448\u0438\u043d\",\"\u0420\u0435\u043c\u043e\u043d\u0442 \u0438\u043c\u043f\u043e\u0440\u0442\u043d\u044b\u0445 \u0441\u0442\u0438\u0440\u0430\u043b\u044c\u043d\u044b\u0445 \u043c\u0430\u0448\u0438\u043d\"]",
            "spec": "Ремонт холодильников и стиральных машин",
            "aboutEduc": "Среднее-специальное слесарь-электрик по ремонту электрооборудования, бытовых машин, приборов. 4 разряд",
            "aboutExp": "28 лет",
            "aboutAddInfo": "",
            "publicStatus": 1,
            "publicDateEnd": "2016-08-26",
            "moderStatus": 3,
            "moderComment": "",
            "contacts": {
                "id": 563,
                "ownerType": 1,
                "ownerID": 1006,
                "phone": "611346",
                "workPhone": "612491",
                "email": "",
                "addr": "ДБ Заря",
                "addrCoord": "",
                "skype": null,
                "icq": null
            },
            "page": {}
        }
    ];
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterList.prototype.bind = function () {
    var window = this.$context.locator.resolve('window');
    window.addEventListener('resize', this._allMinicardServicesCut);
};
MasterList.prototype._allMinicardServicesCut = function () {
    $('.master-minicard').each(function () {
        var minicardServices = $(this).find('.master-minicard__services');
        var servicesList = minicardServices.find('li');
        var maxHeight =
            $(this).height() - ($(this).find('.master-minicard__name').height() + $(this).find('.master-minicard__spec').height());
        var servicesCount = minicardServices.find('li').length;

        console.log('maxHeight = ' + maxHeight);
        if (minicardServices.height() > maxHeight) {
            while (minicardServices.height() > maxHeight && servicesCount >= 0) {
                $(servicesList[servicesCount - 1]).hide();
                servicesCount--;
            }
        } else if ((minicardServices.height() + 10) < maxHeight) {
            var i = 0;
            while (minicardServices.height() < maxHeight && i < servicesCount + 1) {
                $(servicesList[i]).show();
                i++;
            }
            if (minicardServices.height() > maxHeight) {
                $(servicesList[i - 1]).hide();
            }
        }
    });
};
/**
 * Does cleaning for everything that have NOT been set by .bind() method.
 * This method is optional.
 * @returns {Promise|undefined} Promise or nothing.
 */
MasterList.prototype.unbind = function () {
    var window = this.$context.locator.resolve('window');
    window.removeEventLister('resize');
};
