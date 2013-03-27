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

 var fs = require('fs');

 /*==========================================*/
 var writer = (function() {

	var dirInput = '/Users/jzferreira/Mestrado/Database/B6/';
	var dirOutput = '/Users/jzferreira/Projects/parserEntitites/paginas/';
	var fileInput = '/Users/jzferreira/Projects/parserEntitites/pagesB6.txt';

 	var readFile = function(pathFile) {
 		return fs.readFileSync(pathFile, 'utf-8');
 	};

 	var saveNewFile = function(name, txt) {
		fs.writeFileSync(dirOutput + name, txt, 'utf-8');
	};

 	//save object pages to file
 	var pagesToFile = function(options) {
 		if (options) {
 			if (options.pages) {

 				var filename = options.filename || 'pages.txt';
 				var mode = options.mode || 0666;
 				//open file, file will be create if not exist. MODE: 0666 (default)
 				var localfile = fs.open(filename, 'a', mode, function(e, id) {

 					if (e) {
 						throw e;
 					}

 					console.log('File created: ' + options.filename + '\n Writing pages to file....');
 					var content = [];

 					//for (k in options.pages) {
 						var inicio = options.inicio;
 						var fim = options.fim;
 						var newInicio = options.newInicio;//mapeamento para continuacao das paginas
 						while(inicio <= fim) {
 							if (options.pages['pagina' + inicio] && typeof options.pages['pagina' + inicio] != 'undefined') {
								content.push('pagina' + newInicio + '=' + options.pages['pagina'+inicio]);
								var texto = readFile(dirInput + 'pagina' + inicio + '.html');
								saveNewFile('pagina' + newInicio + '.html', texto);
								newInicio++;
							}
							inicio++;
 						}

 					//}

 					fs.write(id, content.join('\n'), null, null, null, function(err, written, buffer) {
 						if (err) {
 							console.log('Error: writing file...');
 						}
 					});

 					fs.close(id, function() {
 						console.log('content saved! \nFile: ' + options.filename + ' closed' + '\n=====================================');
 					});


 				});


 			}
 		}
 	};

 	return {
 		pagesToFile: pagesToFile
 	}

 })();

exports.pagesToFile = function(options) {
	try {
		writer.pagesToFile(options);
	} catch(e) {
		console.log('Error: ' + e.message);
	}
};