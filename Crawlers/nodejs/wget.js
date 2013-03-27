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

var url = require('url');
var httpRequest = require('request');
var httpAgent = require('http-agent');

/*=====================================*/
var wget = (function () {

	var request = function (options) {

		var number = '0) url request: ' + options.url , atual = 'url request: ' + options.url;

		if (options.number) {
			number = options.number.toString();
			atual = number + ') ' + atual;
		} else {
			atual = number;
		}
		
		console.log(atual);

  		var domain = url.parse(options.url);
  		
		var requestOptions = {
			host: domain.host,
			port: 80,
			path: domain.pathname,
			method: 'GET'
		};

		httpRequest(options.url, function (error, response, body) {
			
			if (!error && response.statusCode == 200) {
				if (options.done) {
					options.done.call(this, body);
				}
			}

		});

	};

	var getPages = function(options) {
		
		var url = '';

		if (options.url) {
			url = options.url;
		}

		url = url.replace('http://','');

		var agent = httpAgent.create(url, options.links);

		agent.addListener('next', function (e, agent) {
			//Simple usage: just output the raw
			//HTML returned from each request

			console.log('Visiting: http://' + agent.host + agent.url);

			if (options.done) {
				options.done.call(this, agent.body);
			}

			agent.next();

		});

		agent.addListener('stop', function (e, agent) {
			console.log('Agent has completed visiting all urls');
			if (options.stop) {
				options.stop.call(this);
			}
		});

		agent.start();

	};

	var requestURLS = function (options) {

		var countPage = 0;
		var urls = options.urls;
		var totalPages = urls.length;

		console.log('requestURLS');
	
		var pullRequest = setInterval(function () {
			
			if (countPage < totalPages) {
				
				var url = urls[countPage];

				// console.log(url);

				var params = {
					url: url,
					done: function(data) {
						options.done.call(this, data, url);
					},
					number: countPage
				};

				request.call(this, params);

				countPage++;

			} else {
				clearInterval(pullRequest);
			}

		}, 15000);
		
	};

	return {
		request: request,
		getPages: getPages,
		requestURLS: requestURLS
	};

})();

/*=====================================*/
exports.request = function(options) {
	wget.request(options);
};

/*=====================================*/
exports.getPages = function(options) {
	wget.getPages(options);
};

/*=====================================*/
exports.requestURLS = function(options) {
	wget.requestURLS(options);
};