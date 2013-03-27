//http://allthingsd.com/?s=Nokia+Google+Microsoft+Apple+Samsung
//http://allthingsd.com/page/2/?s=Nokia+Google+Microsoft+Apple+Samsung

var request = require('request');
var cheerio = require('cheerio');
var writer = require('./writer.js');


var allthingsd = (function (params) {
	var _pageNumber = 1;
	var _query = '';
	var _totalPages = 1;

	function QueryException(message) {
		this.message = message;
		this.name = "QueryException";
	}

	var getPageNumber = function () {
		return _pageNumber;
	};

	var incrementPageNumber = function () {
		_pageNumber++;
	};

	var getTotalPages = function () {
		return _totalPages;
	};

	var setTotalPages = function (total) {
		_totalPages = total;
	};

	var getURL = function () {
		var url_default = 'http://allthingsd.com/{page}?s=';
		var pageNumber = getPageNumber();
		if (pageNumber === 1) {
			return url_default.replace('{page}', '').concat(getQuery());
		} else {
			return url_default.replace('{page}', 'page/'.concat(pageNumber.toString()).concat('/')).concat(getQuery());
		}
	};

	var getQuery = function () {
		return _query;
	};

	var setQuery = function (args) {
		if (args && Array.isArray(args)) {
			var found = false;
			args.forEach( function (val, index, array) {
				if (val === '-query') {
					if (array[index + 1] === undefined) {
						throw new QueryException('Define a query de busca');
					} else {
						_query = array[index + 1];
						found = true;
					}
				}
			});
			if (!found) {
				throw new QueryException('Define a query de busca');
			}
		}
	};

	var wrapLastPage = function ($) {
		console.log('Wrap last page number....');
		var pagesNode = $('.pages').text().split(' ');
		try {
			setTotalPages(parseInt(pagesNode[pagesNode.length - 1], 10));
			console.log('Total Pages: ' + getTotalPages().toString());
		}catch (e) {
			console.error('[Error]: ' + e.message);
		}
	};

	var wrapLinks = function ($) {
		console.log('Wrapping links...');
		var linksNode = $('.post-link');
		var postLinks = [];
		for (var i = 0; i < linksNode.length; i++) {
			console.log(linksNode[i].getAttribute('href'));
		}
	};

	var fireRequest = function () {
		var pullrequest = setInterval( function () {
			var urlRequest = getURL();
			console.log(urlRequest);
			request({
				url: urlRequest,
				headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22'
				}
			}, function (error, response, body) {
				if (error) {
					console.log(error);
				} else {
					$ = cheerio.load(body);
					if (getPageNumber() === 1) {
						if (getPageNumber() === 1) {
							wrapLastPage($);
							wrapLinks($);
							incrementPageNumber();
						}
					} else {
						if (getPageNumber() <= getTotalPages()) {
							wrapLinks($);
							incrementPageNumber();
						} else {
							console.log('#### Crawling finished');
							clearInterval(pullrequest);
						}
					}
				}
			});
		}, 15000);
	};

	var init = function (params) {
		setQuery(params);
		fireRequest();
	};

	init(params);

})(process.argv);