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

var urls = [];

/*=====================================*/
var parseIndex = function (content, crawler) {

	var links = [];

	if (content) {
		jsdom.env({
			html: content,
			scripts: ['http://code.jquery.com/jquery-1.7.1.min.js'],
			done: function(errors, window) {
				var $ = window.jQuery;
				
				console.log('INDEX NEWYORK: extract started...');
				
				var months = $('#mainContent div .articlesMonth a');

				$.each(months, function() {
					var href = $(this).attr('href');
					links.push(href);
				});

				crawler.setURLS.call(this, links);

			}
		});
	}
};

/*=====================================*/
var parseHeadline = function(content, crawler) {
	
	var links = [];

	if (content) {
		jsdom.env({
			html: content, 
			scripts: ['http://code.jquery.com/jquery-1.7.1.min.js'],
			done: function (erros, window) {
				var $ = window.jQuery;

				console.log('Get all headlines....');

				var headlines = $('#headlines li a');

				$.each(headlines, function() {
					var href = $(this).attr('href');
					links.push(href);
				});

				crawler.addURLS.call(this, links);
			}
		});
	}

};

/*=====================================*/
var isBusiness = function(title) {
	
	var patternText = /businessday/g;
	var isBusiness = false;

	try {
		
		title = title.replace(/\s/g , '').toLowerCase();
		
		if (patternText.test(title) === true) {
			isBusiness = true;
		} 
	}catch(e) {
		console.error(e.message);
	}
	return isBusiness;
};

var pageCount = {
	number: 0,
	addNumber: function() {
		this.number++;
	},
	getNumber: function() {
		return this.number;
	},
	getName: function() {
		var nowadays = this.number;
		this.number++;
		return 'pagina' + nowadays.toString() + '.html';
	}
};

var parseIsBusiness = function(options) {

	if (options) {

		try {

			jsdom.env(options.content, function (err, window) {
				console.log('parse html...');

				var h2 = window.document.getElementById('masthead').getElementsByTagName('h2')[0].getElementsByTagName('a');

				if (h2.length && h2.length > 0) {

					var patternText = /businessday/g;

					var text = h2[0].innerHTML;

					console.log('Title: ' + text + '\n=====================================\n');

					text = text.replace(/\s/g , '').toLowerCase();

					if (patternText.test(text) === true) {
						console.log('Save Page: ' + options.url);
						var pageName = pageCount.getName();
						options.complete.call(this, {
							content: options.content,
							name: pageName
						});
					} 

				}

			});
		}catch(e) {
			console.log('Error JSDOM! keep walking...\n=====================================\n');
		}
		/*jsdom.env({
			html: options.content,
			scripts: ['http://code.jquery.com/jquery-1.7.1.min.js'],
			done: function (erros, window) {
				var $ = window.jQuery;

				console.log('parse html...');

				var titles = $('#masthead h2 a');

				var patternText = /businessday/g;
				
				var text = $(titles[0]).html();

				console.log('Title: ' + text + '\n=====================================\n');

				text = text.replace(/\s/g , '').toLowerCase();

				if (patternText.test(text) === true) {
					console.log('Save Page: ' + options.url);
					var pageName = pageCount.getName();
					options.complete.call(this, {
						content: options.content,
						name: pageName
					});
				} 
			}
		});*/
	}
};

/*=====================================*/
exports.parserIndex = function(content, crawler) {
	parseIndex.call(this, content, crawler);
};

/*=====================================*/
exports.parserHeadline = function(content, crawler) {
	parseHeadline.call(this, content, crawler);
};

/*=====================================*/
exports.parserIsBusiness = function(options) {
	parseIsBusiness.call(this, options);
};