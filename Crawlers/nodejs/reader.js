/*
 * Source code information
 * -----------------------
 * Original author    Javier Zambrano Ferreira, Nokia Institute of Technology
 * Author email       javier.ferreira@indt.org.br
 * Personal Website   http://www.jzferreira.com
 * Created            01-19-2012
 * Filename           reader
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

function contentException(msg) {
	this.name = 'contentError';
	this.message = msg || 'You must set the file';
	this.message = '-----\n' + this.name + ': ' + this.message + '\n-----';
	this.toString = function() {
		return 'contentException: ' + this.message;
	};
};

contentException.prototype = new Error();
contentException.prototype.constructor = contentException;

 var reader = (function () {
 	
 	var readURL = function(options) {
 		if (options) {
 			if (options.file) {
 				
 				fs.readFile(options.file, 'utf-8', function (err, data) {
 					if (err) throw err;

 					if (options.done) {
 						options.done.call(this, data);
 					}
 				});

 			} else {
 				var exception = new contentException();
 				throw exception;
 			}
 		}
 	};


 	return {
 		readURL: readURL
 	}

 })();

 exports.readURL = function(options) {
 	try {
 		reader.readURL(options);
 	}catch(e) {
 		if (e instanceof contentException) {
			console.error(e.message);
			console.error(e.stack);

		} else {
			console.error(e.message);
		}
 	}
 };