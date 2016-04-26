'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * http://catberry.org/documentation#cat-components-interface
 */

class CounterGa {

    /**
     * Creates a new instance of the "counter-ga" component.
     */
    constructor() {
        /**
         * Object "window".
         * @type {Object}
         * @private
         */
        this._window = null;

        if (this.$context.isBrowser) {
            this._window = this.$context.locator.resolve('window');
        }

        /**
         * Determines if analytics is initialized.
         * @type {boolean}
         * @private
         */
        this._isInitialized = false;
    }

    /**
     * Returns event binding settings for the component.
     * This method is optional.
     * @returns {Promise<Object>|Object|null|undefined} The binding settings or nothing.
     */
    bind() {
        if (typeof (this._window.ga) !== 'function') {
            return;
        }
        if (this._isInitialized) {
            return;
        }
        this._isInitialized = true;
        this._window.ga('create', 'UA-42386292-1', 'auto');
        this.trackPages();
        this.trackErrors();
    }


    /**
     * Tracks pages.
     */
    trackPages() {
        if (typeof (this._window.ga) !== 'function') {
            return;
        }

        // track pages
        this.$context.on('componentRendered', (event) => {
            if (event.name.indexOf("page-") !== 0) {
                return;
            }
            this._window.ga('send', 'pageview', getLocation(event.context));
        });
    }

    /**
     * Tracks errors.
     */
    trackErrors() {
        this.$context.on('error', (error) =>
            this._window.ga('send', 'event', 'error', error ? error.stack : ''));
    }
}

/**
 * Gets location for analytics.
 * @param {Object} context Component context.
 * @returns {string} URL.
 */
function getLocation(context) {
    const location = context.location.clone();
    location.scheme = null;
    location.authority = null;

    return location.toString();
}

module.exports = CounterGa;

