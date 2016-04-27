'use strict';

// This file contains route definitions – the rules how location URLs are translated
// to parameters for stores in the Catberry application.
//
// Format:
// /some/:parameter[store1,store2,store3]?queryParameter=:queryValue[store1,store2]
//
// More details here:
// http://catberry.org/documentation#routing

module.exports = [
	'/:page[Pages]',
	//id мастера
	{
		expression: /^\/([\/\d]+)$/i,
		map: function (urlPath) {
			var matches = urlPath.path.match(/^\/([\/\d]+)$/i);
			return {
				'master/MasterPage': {
					item: matches[1]
				},
				Pages: {
					page: "master-page"
				}
			}
		}
	},
	// визитка мастера
	// путь: /:masterID/print-card
	{
		expression: /^\/(\d+)\/print-card$/i,
		map: function (urlPath) {
			var matches = urlPath.path.match(/^\/(\d+)\/print-card$/i);
			return {
				Pages: {
					page: "master-print-card"
				},
				'master/MasterPage': {
					item: matches[1]
				}
			}
		}
	},
	// статья мастера
	// путь: /:masterID/article/:id
	{
		expression: /^\/(\d+)\/article\/(\d+)$/i,
		map: function (urlPath) {
			var matches = urlPath.path.match(/^\/(\d+)\/article\/(\d+)$/i);
			return {
				Pages: {
					page: "article-item"
				},
				'article/ArticleItem': {
					id: matches[2],
					masterID: matches[1]
				}
			}
		}
	},

	// путь: рубрика/подрубрика
	// путь: рубрика/подрубрика/тег
	// путь: рубрика/подрубрика/секция
	// путь: рубрика/подрубрика/тег/секция
	{
		expression: /^\/([^\/\d]+)\/([^\/\d]+)\/?((?!video$|sale$|sovety$|company$)[^\/\d]+)?\/?(video|sale|sovety|company)?$/i,
		map: function (urlPath) {
			var matches = urlPath.path.match(/^\/([^\/\d]+)\/([^\/\d]+)\/?((?!video$|sale$|sovety$|company$)[^\/\d]+)?\/?(video|sale|sovety|company)?$/i);
			return {
				'rubrika/Rubrika': {
					rubrika: matches[1],
					podrubrika: matches[2]
				},
				Tag: {
					tag: matches[3],
					section: matches[4]
				},
				Pages: {
					page: "master-rubrika"
				}
			}
		}
	},
	// путь: /__/page/:id
	{
		expression: /^\/([^\/\d]+)\/page\/(\d+)$/i,
		map: function (urlPath) {
			var matches = urlPath.path.match(/^\/([^\/\d]+)\/page\/(\d+)/i);
			return {
				Pages: {
					page: matches[1]
				},
				Paginator: {
					currentPage: matches[2]
				}
			};
		}
	},
	// путь: /sale
	// путь: /sovety
	// путь: /video
	// путь: /__/page/:id
	// путь: /__/category/:id
	// путь: /__/category/:id/page/:id
	{
		expression: /^\/(sale|article|video)(\/catalog\/(\d+))?(\/page\/(\d+))?$/i,
		map: function (urlPath) {
			var matches = urlPath.path.match(/^\/(sale|article|video)(\/catalog\/(\d+))?(\/page\/(\d+))?$/i);
			var nameCapitalizeFirstLetter = matches[1].charAt(0).toUpperCase() + matches[1].slice(1);
			var state = {};

			state.Pages = {
				page: matches[1]
			};
			state['rubrika/Rubrikator' + nameCapitalizeFirstLetter] = {
				catalog: matches[3]
			};
			state.Paginator = {
				currentPage: matches[5]
			};
			return state;
		}
	},
	// путь: /company
	// путь: /company/category/:id
	// путь: /company/:id
	{
		expression: /^\/company((\/catalog\/(\d+))|(\/(\d+)))?$/i,
		map: function (urlPath) {
			var matches = urlPath.path.match(/^\/company((\/catalog\/(\d+))|(\/(\d+)))?$/i);
			var state = {};

			state.Pages = {
				page: matches[3] ? "company-rubrika" : (matches[5] ? "company-page" : "company")
			};
			state['rubrika/RubrikaCompany'] = {
				catalog: matches[3]
			};
			state['company/CompanyItem'] = {
				id: matches[5]
			};
			return state;
		}
	},
	// путь: /news/item/:id
	// путь: /vacancy/item/:id
	// путь: /konkurs/item/:id
	{
		expression: /^\/(news|vacancy|konkurs)\/item\/(\d+)$/i,
		map: function (urlPath) {
			var matches = urlPath.path.match(/^\/(news|vacancy|konkurs)\/item\/(\d+)$/i);
			var state = {};

			var string = matches[1];

			state.Pages = {
				page: string + "-item"
			};
			state['other/' + string.charAt(0).toUpperCase() + string.slice(1) + "Item"] = {
				item: matches[2]
			};
			return state;
		}
	},
	// путь: /konkurs/item/:id/add
	{
		expression: /^\/konkurs\/item\/(\d+)\/add-member$/i,
		map: function (urlPath) {
			var matches = urlPath.path.match(/^\/konkurs\/item\/(\d+)\/add-member$/i);
			var state = {};

			var string = matches[1];

			state.Pages = {
				page: "konkurs-member-add"
			};
			state["other/KonkursItem"] = {
				item: matches[1]
			};
			return state;
		}
	},
	// путь: /404
	{
		expression: /^\/404$/i,
		map: function (urlPath) {
			return {
				'Pages': {
					page: "404"
				}
			};
		}
	}
];

