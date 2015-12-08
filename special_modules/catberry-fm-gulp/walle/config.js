var сonfig = {

    /////////////////////
    // MUTABLE OPTIONS ////////////////////////////////
    // YOU CAN CHANGE THIS OPTIONS ALL THE TIME      //
    //                                               //
    // You need to restart builder to apply options. //
    ///////////////////////////////////////////////////

    /**
     * Autoprefixer config
     * @type {Array}
     */
    autoprefixerConfig: ['> 1%', 'last 2 versions', 'opera 12.1', 'android 4'],

    /**
     * Postprocessors for TARS
     * @type {Array}
     * Example:
     *
     * postcss: [
     *     {
     *         name: 'postcss-short',
     *         options: {
     *             deny: ['text']
     *         }
     *     }
     * ]
     */
    postcss: [],

    /**
     * Use svg images
     * @type {Boolean}
     */
    useSVG: true,

    /**
     * Use linting and hinting of js-files
     * @type {Boolean}
     */
    useJsLintAndHint: false,

    /**
     * Path-strings to js-files, which have to be included before modules' js-files
     * Example: ['./markup/controller/** /*.js']
     * @type {Array}
     */
    jsPathsToConcatBeforeModulesJs: [],

    /**
     * Lint additional js before modules
     * @type {Boolean}
     */
    lintJsCodeBeforeModules: false,

    /**
     * Path-strings to js-files, which have to be included before modules' js-files
     * @type {Array}
     */
    jsPathsToConcatAfterModulesJs: [],

    /**
     * Lint additional js after modules
     * @type {Boolean}
     */
    lintJsCodeAfterModules: false,

    /**
     * Use babel for ES6(ES7-ESNext) syntax support
     * @type {Boolean}
     */
    useBabel: true,

    /**
     * Write sourcemaps
     * @type {Object}
     *
     * active – is sourcemaps active
     * inline – use inline sourcemaps or in separate file
     */
    sourcemaps: {
        js: {
            active: true,
            inline: true
        },
        css: {
            active: true,
            inline: true
        }
    },

    /**
     * Config for Notify module
     * @type {Object}
     */
    notifyConfig: {

        /**
         * Do you need to use notify?
         * @type {Boolean}
         */
        useNotify: false,

        /**
         * Title for notifier
         * @type {String}
         */
        title: 'WallE notification',


        /**
         * Label for timestamp of task finishing time
         * @type {String}
         */
        taskFinishedText: 'Task finished at: '
    },

    /**
     * Config for browser-sync module
     * @type {Object}
     */
    browserSyncConfig: {

        /**
         * dir to serve files from
         * @type {String}
         */
        baseDir: './dev',

        /**
         * Port of local server for browser-sync
         * @type {Number}
         */
        port: 3004,

        /**
         * Switch to false, if you don't need to open browser in dev mode
         * @type {Boolean}
         */
        open: true,

        /**
         * Choose browser to open
         * @type {String|Array}
         * Example: ['google chrome', 'firefox']
         * Avalible: safari, internet explorer, google chrome, firefox, opera
         */
        browser: 'default',

        /**
         * Choose the page to open in browser at first opening
         * @type {String}
         */
        startUrl: '/index.html',

        /**
         * If you don't need to see notification in browser, switch to false
         * @type {Boolean}
         */
        useNotifyInBrowser: true
    },

    /**
     * Remove console.log and debugger from js code in release mode
     * @type {Boolean}
     */
    removeConsoleLog: true,

    /**
     * Minify result html in build version
     * If is set to false, compiled html will be prettified
     * @type {Boolean}
     */
    minifyHtml: false,

    /**
     * Beginning of path for static files
     * You have to use %=staticPrefix=% placeholder in paths to static
     * Example: %=staticPrefix=%img/logo.png
     * Will be replaced to '/static/img/logo.png'
     * @type {String}
     */
    staticPrefix: 'static/',

    /**
     * Beginning of path for static files for using in css
     * You have to use %=staticPrefixForCss=% placeholder in paths to static in css files
     * Example: background: url('%=staticPrefixForCss=%logo.png');
     * Will be replaced to background: url('../img/logo.png');
     * @type {String}
     */
    staticPrefixForCss: function () {
        return '../' + this.fs.imagesFolderName + '/';
    },

    /**
     * Path to build version of project
     * Could be like '../../../build' or absolute path
     * @type {String}
     */
    buildPath: './builds/',

    /**
     * Use build versioning
     * Build version is a date ot building
     * @type {Boolean}
     */
    useBuildVersioning: false,

    /**
     * Use archiver for your build
     * @type {Boolean}
     */
    useArchiver: false,

    /**
     * Set ulimit. Topical for Linux-family OS and OSX.
     * @type {Number}
     */
    ulimit: 4096,

    //////////////////////////////////////////////
    //////////////////////////////////////////////



    /**
     * What kind of size of images are you going to use.
     * 96 — 1 dppx (regular)
     * 192 — 2 dppx (retina)
     * 288 — 3 dppx (nexus 5, for example)
     * 384 - 4 dppx (nexus 6, for example)
     * Example if using for all displays: usePpi: [96, 192, 288, 384]
     * You can change with options not only on init or reinit,
     * but at with time you have to create new directories
     * and delete unused.
     * @type {Array}
     */
    useImagesForDisplayWithDpi: [96],

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    // You have to change with options after manually      //
    // renaming static and img folder                     //
    //                                                    //
    // Do not rename these dirs before reinit             //
    ////////////////////////////////////////////////////////

    /**
     * File structure settings
     * @type {Object}
     */
    fs: {

        /**
         * Name of folder with static files, such *.css, *.js and so on
         * 'static' by default
         * @type {String}
         */
        staticFolderName: 'catberry_static',

        /**
         * Name of folder with modules files
         * 'static' by default
         * @type {String}
         */
        modulesFolderName: 'catberry_components',

        /**
         * Name of folder with images
         * 'img' by default
         * @type {String}
         */
        imagesFolderName: 'img'
    }

    ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
};

module.exports = сonfig;
