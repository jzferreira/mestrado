// http://searchapp.cnn.com/money-search/query.jsp?query=Nokia+Google+Microsoft+Apple+Samsung&type=article&start=1&npp=10&s=all&primaryType=article&sortBy=date&csiID=csi6

var request = require('request');
var cheerio = require('cheerio');
var writer = require('./writer.js');

var cnn = (function () {

	var page = 3661;
	var totalPages = 11001;
	var url = 'http://searchapp.cnn.com/money-search/query.jsp?query=Nokia+Google+Microsoft+Apple+Samsung&type=article&start={start}&npp=10&s=all&primaryType=article&sortBy=date&csiID=csi6';

	var pullRequest = setInterval( function () {
		request({
			url: url.replace('{start}', page),
			headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22'
			}
		}, function (error, response, body) {
			if (error) {
				console.log(error);
			} else {
				if (page <= totalPages) {
					try {
						var links = [];
						console.log('Request start page: ' + page);
						$ = cheerio.load(body);
						var jsCode = $('#jsCode').text();
						var result = JSON.parse(jsCode);
						for (var i = 0; i < result.results[0].length; i++) {
							var temp = result.results[0][i];
							links.push(temp.url);
						}
						//page = page + 10;
						writer.arrayURL({
							content: links,
							file: 'cnnMoney.txt'
						});
					} catch(e) {
						console.log('error: ' + e.message);
						console.log('Next page: ' + (page + 10));
					} finally {
						page = page + 10;
					}
				} else {
					console.log('#### Crawling finished');
					clearInterval(pullRequest);
				}
			}
		});
	}, 15000);
})();