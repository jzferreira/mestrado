/*
 * Source code information
 * -----------------------
 * Original author    Javier Zambrano Ferreira, Nokia Institute of Technology
 * Author email       javier.ferreira@indt.org.br
 * Personal Website   http://www.jzferreira.com
 * Created            01-19-2012
 * Filename           crawler
 * Revision            1.0
 * Release status     State:
 *
 * Last modified
 * -----------------------
 * Date: 01-19-2012 Author: Javier Zambrano Ferreira
 * Description: This is the first version of this crawler.
 *
 * Copyright (c) 2012 Nokia Technology Institue. All rights reserved.
 */

/*modules*/
var http = require('http');
var httpAgent = require('http-agent');
var jsdom = require('jsdom');
var util = require('util');
var writer = require('./writer.js');
var wget = require('./wget.js');
var parserNYT = require('./parserNYT.js');
var reader = require('./reader.js');
var parserBloomberg = require('./parserBloomberg.js');
var parserReuters = require('./parserReuters.js');

/*New York Times - Object*/
var nyt = {
	inputNYT: [{
		host: 'http://spiderbites.nytimes.com',
		port: 80,
		path: '/free_2011/',
		method: 'GET',
		year: 2011
	}, {
		host: 'http://spiderbites.nytimes.com',
		port: 80,
		path: '/free_2012/',
		method: 'GET',
		year: 2012
	}, {
		host: 'http://spiderbites.nytimes.com',
		port: 80,
		path: '/free_2013/',
		method: 'GET',
		year: 2013
	}],
	urlsNYT: [],
	getInputItem: function(year) {
		var i = this.inputNYT.length - 1, elements = this.inputNYT, item = {};
		for (i; i >= 0 ; i--) {
			if (elements[i].year === year) {
				item = elements[i];
				break;
			}
		}
		return item;
	},
	pageCount: 1
};
/*=====================================*/
/*Bloomberg*/

var getBloombergStandard = function (options) {
	return {
		page: options.page,
		maxPage: options.maxPage,
		q: options.q,
		sort: options.sort,
		getInitPage: function () {
			var instance = this;
			return 'search?content_type=news&max_age=0' +'&page='+ instance.page + '&q=' + instance.q + '&sort=' + instance.sort;
		},
		getNextPage: function () {
			var instance = this;
			instance.page++;
			if (instance.page <= instance.maxPage) {
				return instance.getInitPage();
			}
		},
		urlsSearchResults: [],
		addURLSearchResults: function (url) {
			this.urlsSearchResults.push(url);
		},
		buildStartSearch: function () {
			var instance = this;

			instance.addURLSearchResults(instance.getInitPage());

			for (var i = 2; i <= instance.maxPage; i++) {
				instance.addURLSearchResults(instance.getNextPage());
			}

			return instance.urlsSearchResults;
		}
	}	
};

var bloomberg = {
	baseHOST: 'http://search1.bloomberg.com/',
	microsoft: getBloombergStandard({page: 1, maxPage: 100, q: 'microsoft', sort: 1}),
	samsung: getBloombergStandard({page: 1, maxPage: 100, q: 'samsung', sort: 1}),
	apple: getBloombergStandard({page: 1, maxPage: 100, q: 'apple', sort: 1}),
	nokia: getBloombergStandard({page: 1, maxPage: 100, q: 'nokia', sort: 1}),
	google: getBloombergStandard({page: 1, maxPage: 100, q: 'google', sort: 1})
};

/*=====================================*/
/*Reuters*/

var getReteursStandard = function (options) {
	return {
		page: options.page,
		maxPage: options.maxPage,
		q: options.q,
		getInitPage: function () {
			var instance = this;
			return 'search?blob=' + instance.q + '&pn=' + instance.page;
		},
		getNextPage: function () {
			var instance = this;
			instance.page++;
			if (instance.page <= instance.maxPage) {
				return instance.getInitPage();
			}
		},
		urlsSearchResults: [],
		addURLSearchResults: function (url) {
			this.urlsSearchResults.push(url);
		},
		buildStartSearch: function() {
			var instance = this;
			instance.addURLSearchResults(instance.getInitPage());
			for (var i = 2; i <= instance.maxPage; i++) {
				instance.addURLSearchResults(instance.getNextPage());
			}
			return instance.urlsSearchResults;
		}
	}
}

var reuters = {
	baseHOST: 'http://www.reuters.com/',
	microsoft: getReteursStandard({page: 1, maxPage: 100, q: 'microsoft'}),
	samsung: getReteursStandard({page: 1, maxPage: 100, q: 'samsung'}),
	apple: getReteursStandard({page: 1, maxPage: 100, q: 'apple'}),
	nokia: getReteursStandard({page: 1, maxPage: 100, q: 'nokia'}),
	google: getReteursStandard({page: 1, maxPage: 100, q: 'google'})
};

/*=====================================*/
var crawler = {
	urls: [],
	/*generic method to request several urls*/
	setURLS: function (links) {

		var element = nyt.getInputItem(2012);

		var options = {
			url: element.host,
			links: links,
			done: function(data) {
				parserNYT.parserHeadline(data, crawler);
			},
			stop: function () {
				console.log(crawler.urls.length);
			}
		};
		
		wget.getPages(options);

	},
	addURLS: function (links, filename) {

		//filename = 'nytimes2013.txt';
		//var fileName = 'bloombergMicrosoft.txt';
		// var fileName = 'bloombergSamung.txt';
		filename = 'bloombergGoogle.txt';

		writer.arrayURL({
			content: links,
			file: filename
		});
	}

};

/*=====================================*/
var startNYT = function(year) {

	var element = nyt.getInputItem(year);

	var options = {
		url: element.host + element.path,
		done: function(data) {
			parserNYT.parserIndex(data, crawler);
		}
	};

	wget.request(options);
};

/*=====================================*/
var startBloomberg = function () {

	var host = bloomberg.baseHOST;
	var links = bloomberg.google.buildStartSearch();

	var options = {
		url: host,
		links: links,
		done: function(data) {
			parserBloomberg.parserSearchResults({
				content: data,
				done: function (data) {
					var links = crawler.urls;
					console.log('\nAdding urls...=====================================\n');
					crawler.urls = links.concat(data);
				}
			});
		},
		stop: function () {
			var urls = crawler.urls;
			crawler.addURLS(urls);
		}
	};
		
	wget.getPages(options);
};

/*=====================================*/
var startReuters = function() {

	var host = reuters.baseHOST;
	var links = reuters.google.buildStartSearch();
	var filename = 'reuters_google.txt';

	var options = {
		url: host,
		links: links,
		done: function (data) {
			parserReuters.parserSearchResults({
				content: data,
				done: function (data) {
					var links = crawler.urls;
					console.log('\nAdding urls...=====================================\n');
					crawler.urls = links.concat(data);
				}
			});
		},
		stop: function() {
			var urls = crawler.urls;
			crawler.addURLS(urls, filename);
		}
	};

	wget.getPages(options);

};

/*=====================================*/
var init = function() {

	//cnn
	var path = '/Users/javferre/Mestrado/Crawlers/nodejs/';
	var name = 'cnnMoney';

	writer.mkdir({
		path: path,
		name: name
	});

	var pageNumber = 0;

	path += name;

	reader.readURL({
		file: '/Users/javferre/Mestrado/Crawlers/urls/urls/cnnMoney.txt',
		done: function (data) {
			var links = data.split('\n');
			wget.requestURLS({
				urls: links,
				done: function (data, url) {
					var fullpath = path + '/page' + pageNumber.toString() + '.html';
					console.log(fullpath);

					pageNumber++;
					writer.textToFile({
						content: data,
						file: fullpath
					});
				}
			});
		}
	});
};

init();