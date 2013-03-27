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
var util = require('util');
var parserBloomberg = require('./bloomberg/parser.js');
var fs = require('fs');
var io = require('./io.js');

var pagesByEntities = {
	Google: [],
	Nokia: [],
	Apple: [],
	Microsoft: [],
	Samsung: []
};

/*para cada pagina um atributo e array de entidades*/
var pages = {};


var extract = {

	_entidades: ['Google', 'Nokia', 'Apple', 'Microsoft', 'Samsung'],

	check: function(options) {

		if (options.txt && typeof options.txt != 'undefined') {

			var ents = extract._entidades;

			var arrayEntities = [];

			ents.forEach(function (element, index, array) {

				var find = options.txt.indexOf(element);
				if (find >= 0) {
					arrayEntities.push(element);
					pagesByEntities[element].push(options.pageName);
				}

			});

			if (!pages[options.pageName] && typeof pages[options.pageName] == 'undefined') {
				if (arrayEntities.length > 0)
					pages[options.pageName] = arrayEntities;
			} else {
				pages[options.pageName] = pages[options.pageName].concat(arrayEntities);
			}

			console.log(options.pageName + ' = ' + pages[options.pageName]);

		}
	}
};

var reader = {
	
	pathDir: '', //diretorio de arquivos

	readFile: function (options) {

		if (options.pathFile) {
			var txt = fs.readFileSync(options.pathFile, 'utf-8');
			
			try {
				var paragrafos = parserBloomberg.parserEntities({
					content: txt
				});

				if (typeof paragrafos != 'undefined') {

				if (paragrafos.length > 0) {
					var content = paragrafos.join(' ');
					extract.check({
						pageName: options.fileName,
						txt: content
					});
				}
			}

			}catch (Exception) {
				console.log(Exception.message);
			}
		}

	},

	read: function (options) {
		
		var it = this;

		if (options) {
			it.pathDir = options.pathDir;
			
			var files = fs.readdirSync(options.pathDir);
			files.forEach(function (element, index) {
				console.log('Reading file: ' + element);
				var name = element.toString().replace('.html', '');
				reader.readFile({
					pathFile: it.pathDir + element,
					fileName: name
				});
				console.log('#########################');
			});

			
			io.pagesToFile({
				pages: pages,
				filename: 'pagesB6.txt',
				inicio: 1001,
				fim: 1200,
				newInicio:944
			});
		}
	}
};

var main = (function () {


	var pathDir = '/Users/jzferreira/Mestrado/Database/B6/';

	console.log('Starting read ' + pathDir);

	reader.read({
		pathDir: pathDir
	});


})();