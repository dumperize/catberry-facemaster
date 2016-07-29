module.exports = new RubrikaFormat();

function RubrikaFormat() {

}
/**
 * Делает древовидную структуру из массива рубрик
 * @param data массив рубрик
 * @param func функция для выполнения
 */
RubrikaFormat.prototype.makeTree = function (data, func) {
    if (Object.prototype.toString.call(data) !== '[object Array]')
        return;

    var tree = [];
    data.forEach(function (el) {
        //подготовим дерево для элемента
        if (el.parentID == 0) {
            if (!tree[el.id])
                tree[el.id] = {parent: {}, podrubriks: []};
        } else {
            if (!tree[el.parentID])
                tree[el.parentID] = {parent: {}, podrubriks: []};
        }
        //сделаем что-то для пользоваеля
        func(el, tree);

        //скопируем элемент в дерево
        if (el.parentID == 0) {
            Object.keys(el)
                .forEach(function (key) {
                    if (tree[el.id].parent[key] == undefined)
                        tree[el.id].parent[key] = el[key];
                });
        } else {
            tree[el.parentID].podrubriks.push(el);
        }
    });
    return this.sortTree(tree);
};

/**
 * Сортирует древовидную структуру из массива рубрик
 * @param data
 */
RubrikaFormat.prototype.sortTree = function (data) {
    var array = Object.keys(data)
        .map(function (key) {
            return data[key];
        });
    array.forEach(function (el) {
        el.podrubriks.sort(function (a, b) {
            return a.name > b.name ? 1 : -1;
        });
    });
    array.sort(function (a, b) {
        return a.parent.sort - b.parent.sort;
    });
    return array;
};
/**
 * Собирает массив id рубрик принадлежащих одному родителю
 * @param data
 */
RubrikaFormat.prototype.setPodrubriksID = function (tree) {
    tree.forEach(function (el) {
        var listID = [];
        el.podrubriks.forEach(function (podrubrika) {
            podrubrika.podrubriksID = [podrubrika.id];
            listID.push(podrubrika.id);
        });
        el.parent.podrubriksID = listID;
    });
    return tree;
};