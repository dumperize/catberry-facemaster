'use strict';

var notify = walle.packages.notify;
var notifyConfig = walle.config.notifyConfig;
var path = require('path');

/**
 * Notify helper
 */
module.exports = {
    /**
     * On error notifier
     * @param  {String} message Error message
     * @param  {Error} error    Error object
     * @return {Pipe}
     */
    error: function (message, error) {

        var resultMessage;

        if (message) {
            resultMessage = '\n' + message + '\nLook in the console for details.\n\n';
        } else {
            resultMessage =  '\nSomething is happen while working.\nLook in the console for details.\n\n';
        }

        if (error) {
            resultMessage += error;
        } else {
            error = new Error();
        }

        if (process.env.NODE_ENV !== 'production' && !process.env.DISABLE_NOTIFIER) {
            return notify.onError({
                title: notifyConfig.title,
                message: resultMessage,
                onLast: true
            })(error);
        } else {
            console.error(resultMessage);
            return walle.packages.gutil.noop();
        }
    },

    /**
     * On success notifier
     * @param  {String}  message  Success message
     * @param  {Boolean} onLast   Use notify only on last changed file
     * @return {Pipe}
     */
    success: function (message, onLast) {
        var resultMessage = message + '\n' || 'Task\'ve been finished\n';

        resultMessage += notifyConfig.taskFinishedText + '<%= options.date %>';

        if (notifyConfig.useNotify && walle.options.notify && process.env.NODE_ENV !== 'production') {
            return notify({
                onLast: onLast || true,
                sound: notifyConfig.sounds.onSuccess,
                title: notifyConfig.title,
                message: resultMessage,
                templateOptions: {
                    date: walle.helpers.dateFormatter.getTimeOfModify()
                }
            });
        } else {
            return walle.packages.gutil.noop();
        }
    }
};
