var fs = require('fs');
var writer = require('/Users/jzferreira/Mestrado/Crawlers/nodejs/writer.js');

var pathFile = '/Users/jzferreira/Mestrado/Crawlers/urls/new_allthingds.txt';

var urlsValidas = [];
var urlsByEnt = {
	'apple': [],
	'samsung': [],
	'microsoft': [],
	'nokia': [],
	'google': []
};

function hasEnt(url) {

	var ent = ['microsoft', 'apple', 'samsung', 'nokia', 'google'];
	var response = false;
	for (var i = 0, size = ent.length; i < size; i++) {
		var tempEnt = ent[i];
		if (url.indexOf(tempEnt) >= 0) {
			//urlsByEnt[tempEnt].push(url);
			response = true;
			break;
		}
	}
	return response;
};

function readFile() {
	fs.readFile(pathFile, 'utf-8', function (err, data) {
 		if (err) throw err;
 		var urls = data.split('\n');
 		urls.forEach(function (value, index) {
 			var isValid = hasEnt(value);
 			if (isValid) {
 				urlsValidas.push(value);
 			}
 		});

 		console.log('Number of URLS:' + urlsValidas.length + '\n #################');
 		console.log('Number of Apple URLS: ' + urlsByEnt['apple'].length);
 		console.log('Number of Samsung URLS: ' + urlsByEnt['samsung'].length);
 		console.log('Number of Microsoft URLS: ' + urlsByEnt['microsoft'].length);
 		console.log('Number of Google URLS: ' + urlsByEnt['google'].length);
 		console.log('Number of Nokia URLS: ' + urlsByEnt['nokia'].length);

 		writer.arrayURL({
 			'file': 'entities_allthingds.txt',
 			'content': urlsValidas
 		});
 	});
};

readFile();