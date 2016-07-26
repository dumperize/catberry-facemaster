'use strict';

module.exports = MasterBlockReview;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "master-block-review" component.
 * @constructor
 */
function MasterBlockReview() {

}

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
MasterBlockReview.prototype.render = function () {
    var self = this;

    return this.$context.getStoreData()
        .then(function (data) {
            //console.log(data);
            if (data.vkLikes) {
                try {
                    data.vkLikes.data = JSON.parse(data.vkLikes.data);
                } catch (e) {
                    data.vkLikes.data = data.vkLikes.data.substring(0, data.vkLikes.data.lastIndexOf('}')) + '}]';
                    data.vkLikes.data = JSON.parse(data.vkLikes.data);
                }
            }
            if (!data.vkLikes || !data.vkLikes.countLikes) {
                data.vkLikes = {
                    data: [],
                    countLikes: 0
                }
            }
            if (data.vkLikes.data.length != 9) {
                data.vkLikes.data.length = 9; //укорачиваем массив до 9 элементов (больше не требуется)
            }
            var location = self.$context.location;
            var url = 'http://' + location.authority.host + location.path;
            var desc = '#FM_vizitka ' + data.rubrika.name + ' в Тольятти. ';
            Object.keys(data.services).forEach(function (item) {
                data.services[item].forEach(function (item) {
                    desc += item + '; '
                });
            });

            return {
                id: data.id,
                vkLikes: data.vkLikes,
                name: data.name,
                imgID: data.imgID,
                url: url,
                desc: desc
            }
        });
};
/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
MasterBlockReview.prototype.bind = function () {
    var elem = this.$context.element;
    $('div.share42init').each(function (idx) {
        var el = $(this), u = el.attr('data-url'), t = el.attr('data-title'), i = el.attr('data-image'), d = el.attr('data-description'), f = el.attr('data-path'), fn = el.attr('data-icons-file'), z = el.attr("data-zero-counter");
        if (!u)u = location.href;
        if (!fn)fn = 'icons.png';
        if (!z)z = 0;

        if (!t)t = document.title;
        if (!d) {
            var meta = $('meta[name="description"]').attr('content');
            if (meta !== undefined)d = meta; else d = '';
        }
        u = encodeURIComponent(u);
        t = encodeURIComponent(t);
        t = t.replace(/\'/g, '%27');
        i = encodeURIComponent(i);
        d = encodeURIComponent(d);
        d = d.replace(/\'/g, '%27');
        var vkImage = '';
        if (i != 'null' && i != '')vkImage = '&image=' + i;
        var s = new Array('"#" data-count="vk" onclick="window.open(\'//vk.com/share.php?url=' + u + '&title=' + t + vkImage + '&description=' + d + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться В Контакте"', '"#" data-count="fb" onclick="window.open(\'//www.facebook.com/sharer/sharer.php?u=' + u + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Поделиться в Facebook"', '"#" data-count="odkl" onclick="window.open(\'//ok.ru/dk?st.cmd=addShare&st._surl=' + u + '&title=' + t + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Добавить в Одноклассники"', '"#" data-count="twi" onclick="window.open(\'//twitter.com/intent/tweet?text=' + t + '&url=' + u + '\', \'_blank\', \'scrollbars=0, resizable=1, menubar=0, left=100, top=100, width=550, height=440, toolbar=0, status=0\');return false" title="Добавить в Twitter"');
        var l = '';
        for (var j = 0; j < s.length; j++)l += '<span class="share42-item" style="display:inline-block;margin:0 6px 6px 0;height:32px;"><a rel="nofollow" style="display:inline-block;width:32px;height:32px;margin:0;padding:0;outline:none;background:url(' + f + fn + ') -' + 32 * j + 'px 0 no-repeat" href=' + s[j] + ' target="_blank"></a></span>';
        el.html('<span id="share42">' + l + '</span>' + '');
    });
};

MasterBlockReview.prototype.unbind = function () {

};