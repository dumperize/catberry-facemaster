var fs = require('fs');

// Helper to load files from dir recursively and synchronously
var globalDir = __dirname.slice(0, -8);
var loadJsFiles = function (dir) {

    var results = [],
        list = fs.readdirSync(globalDir + dir);

    list.forEach(function (file) {
        var stat;

        file = dir + '/' + file;
        stat = fs.statSync(globalDir + file);

        if (stat && stat.isDirectory()) {
            results = results.concat(loadJsFiles(file));
        } else {
            if (!file.match(/(example-task)/) && !file.match(/(example-watcher)/) && file.match(/(.js*)/)) {
                results.push(file);
            }
        }
    });
    return results;
};

module.exports = loadJsFiles;