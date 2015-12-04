'use strict';

var DEFAULT_COLOR = 'gray',
	PLUGIN_NAME = 'csstime';

module.exports = function (plugins, config) {
	return {
		/**
		 * Writes logs
		 * @param {string} text
		 * @param {string} color
		 */
		write: function (text, color) {
			color = color || DEFAULT_COLOR;
			if (!(color in plugins.util.colors)) {
				color = DEFAULT_COLOR;
			}
			plugins.util.log(plugins.util.colors[color](PLUGIN_NAME + ':', text));
		},

		/**
		 * Notifies.
		 * @param {string} message
		 */
		notify: function (message) {
			if (!config.useNotify) {
				return;
			}
			plugins.notifier.notify({
				title: PLUGIN_NAME,
				message: message
			});
		}
	};
};