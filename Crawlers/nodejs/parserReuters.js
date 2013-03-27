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

var jsdom = require('jsdom');

/*=====================================*/
var parseSearchResults = function (options) {
	if (options) {
		try {
			jsdom.env(options.content, function (err, window) {
				console.log('parse html...');
				var results = [];

				var headline = window.document.getElementById('searchCenter').getElementsByClassName('searchHeadline');

				for (var j = 0; j < headline.length; j++) {
					var aElement = headline[j].getElementsByTagName('a');
					results.push(aElement[0]);
				}

				var links = [], i = 0, size = results.length;

				for (i; i < size; i++) {
					var href = results[i].getAttribute('href');
					links.push(href);
				}

				if (options.done) {
					options.done.call(this, links);
				}
				
			});
		}catch(e) {
			//console.log('Error JSDOM! keep walking...\n=====================================\n');
			console.log('ERROR: ' + e.message + '\n=====================================\n');
		}
	}
};

/*=====================================*/
exports.parserSearchResults = function(options) {
	parseSearchResults.call(this, options);
};