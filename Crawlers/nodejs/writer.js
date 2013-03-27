/*
 * Source code information
 * -----------------------
 * Original author    Javier Zambrano Ferreira, Nokia Institute of Technology
 * Author email       javier.ferreira@indt.org.br
 * Personal Website   http://www.jzferreira.com
 * Created            01-19-2012
 * Filename           file
 * Revision            1.0
 * Release status     State:
 *
 * Last modified
 * -----------------------
 * Date: 01-19-2012 Author: Javier Zambrano Ferreira
 * Description: This module is responsible to save all content.
 *
 * Copyright (c) 2012 Nokia Technology Institue. All rights reserved.
 */

 var fs = require('fs');

/*=====================================*/
function contentException(msg) {
	this.name = 'contentError';
	this.message = msg || 'You must set the content';
	this.message = '-----\n' + this.name + ': ' + this.message + '\n-----';
	this.toString = function() {
		return 'contentException: ' + this.message;
	};
};

contentException.prototype = new Error();
contentException.prototype.constructor = contentException;

/*=====================================*/
//string PROTOTYPE RÁ! It's works only with one character :P
String.prototype.endWith = function (value) {
	var lastElement = this.length - 1;
	return this[lastElement] == value;
};

/*=====================================*/
var writer = (function() {
 	var textToFile = function (options) {
 		if (options) {
 			if (options.content) {
 				var mode = options.mode || 0666;
 				//open file, file will be create if not exist. MODE: 0666 (default)
 				var localFile = fs.open(options.file, 'a', mode, function (e, id) {
 					
 					//id = file identification
 					//e = exception object
 					if (e) {
 						var exception = new contentException(e.message);
 						throw exception;
 					}

 					console.log('File create: ' + options.file + '\n Write content....');

 					fs.write(id, options.content, null, null, null, function (err, written, buffer) {
 						if (err) {
 							var exception = new contentException(err.message);
 							throw exception;
 						}
 					});

 					fs.close(id, function() {
 						console.log('content saved! \nFile: ' + options.file + ' closed' + '\n=====================================');
 					});

 				});

 			} else {
 				var exception = new contentException();
 				throw exception;
 			}
 		} else {
 			var exception = new contentException('You must set options object');
 			throw exception;
 		}
 	};

 	var arrayURL = function (options) {
 		if (options) {
 			if (options.content.length) {
 				var conteudo = options.content.join('\n');
 				options.content = conteudo;
 				textToFile(options);
 			}
 		}
 	};

 	var mkdir = function (options) {
 		if (options) {
 			if (options.name) {
 				var mode = options.mode || 0777;
 				var path = options.path || '';

 				if (path != '' && !path.endWith('/')) {
 					path += '/';
 				}

 				path += options.name;

 				fs.mkdir(path, mode, function() {
 					console.log('The dir was created: ' + path);
 				});
 			} else {
 				var exception = new contentException('You must set the dir name');
 				throw exception;
 			}
 		}
 	};

 	return {
 		textToFile: textToFile,
 		arrayURL: arrayURL,
 		mkdir: mkdir
 	};

 })();
/*=====================================*/

exports.mkdir = function(options) {
	try {
		writer.mkdir(options);
	}catch(e) {
		if (e instanceof contentException) {
			console.error(e.message);
			console.error(e.stack);

		} else {
			console.error(e.message);
		}
	}
};

/*=====================================*/
 exports.textToFile = function(options) {
 	try {
		writer.textToFile(options);
	}catch(e) {
		if (e instanceof contentException) {
			console.error(e.message);
			console.error(e.stack);

		} else {
			console.error(e.message);
		}
	}
 };

/*=====================================*/
 exports.arrayURL = function(options) {
 	try {
 		writer.arrayURL(options);
 	}catch(e) {
 		if (e instanceof contentException) {
			console.error(e.message);
			console.error(e.stack);

		} else {
			console.error(e.message);
		}
 	}
 };