'use strict';

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * http://catberry.org/documentation#cat-components-interface
 */

class CounterYa {

    /**
     * Creates a new instance of the "counter-ya" component.
     */
    constructor() {
        this._window = null;
        if (this.$context.isBrowser) {
            this._window = this.$context.locator.resolve('window');
        }
    }

    /**
     * Gets a data context for the template engine.
     * This method is optional.
     * @returns {Promise<Object>|Object|null|undefined} The data context for the template engine.
     */
    render() {
    }

    /**
     * Returns event binding settings for the component.
     * This method is optional.
     * @returns {Promise<Object>|Object|null|undefined} The binding settings or nothing.
     */
    bind() {
        this.trackPages();
    }

    /**
     * Tracks pages.
     */
    trackPages() {

        // track pages
        this.$context.on('componentRendered', (event) => {

            if (event.name.indexOf("page-") !== 0) {
                return;
            }
            if (typeof (this._window.yaCounter23837146) !== 'object') {
                return;
            }
            yaCounter23837146.hit(document.location.pathname, {
                title: document.title
            });
            //this._window.ga('send', 'pageview', getLocation(event.context));
        });
    }

    /**
     * Clans everything up. The events have been set by .bind() method are cleaned automatically.
     * This method is optional.
     * @returns {Promise|undefined} Promise or finished work or nothing.
     */
    unbind() {

    }
}

module.exports = CounterYa;

