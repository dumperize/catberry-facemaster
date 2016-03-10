module.exports = serializeForm;

function serializeForm(dataJquery) {
    var obj = {};
    dataJquery.forEach(function(el){
        obj[el.name] = el.value;
    });
    return obj;
}