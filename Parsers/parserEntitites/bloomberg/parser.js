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

/*======================================*/
var parserEntities = function (options) {


	if (options && options.content) {
		try {
			var paragrafos = [];
			if (options.content != '') {
				jsdom.env(options.content, function (err, window) {

					console.log("looking for entities....");

				//recupera node raiz 'story_content'
					var nodeRoot = window.document.getElementById('story_content').getElementsByTagName('p');

					for (var i = 0, size = nodeRoot.length; i < size; i++) {
						paragrafos.push(nodeRoot[i].textContent);
					}

					delete nodeRoot;

				});
			}
		} catch (e) {
			console.log('ERROR: parsear o documento bloomberg. MSG DEBUG:' + e.message + '\n=====================================\n');
		} finally {
			return paragrafos;
		}
	}

};

/*=====================================*/
exports.parserEntities = function(options) {
	return parserEntities.call(this, options);
};