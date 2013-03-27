var fs = require('fs');
var io = require('../parserEntitites/io.js');

var pathFile = '/Users/jzferreira/Desktop/allthingsd/logurlbaixadas.txt';

var emp = {
	yahoo: [],
	google: [],
	microsoft: [],
	nokia: [],
	samsung: []
};

var urlControl = {};

function isNewURL(url) {
	return (!urlControl[url] && typeof urlControl[url] == 'undefined');
};

function isEntity(url, ent) {
	if (url.indexOf(ent) >= 0) {
		url = url.replace('More</a', '').replace('More</', '').replace('/More</bio', '');
		emp[ent].push(url);
	}
};

function printUrls() {
	for (ent in emp) {
		emp[ent].forEach(function (value, index) {
			console.log(value);
		});
	}
};

function putRight(url, ent) {
	if (isNewURL(url)) {
		isEntity(url, ent)
	}
};


function readFile() {
	fs.readFile(pathFile, 'utf-8', function (err, data) {
 		if (err) throw err;
 		var urls = data.split('\n');

 		for (ent in emp) {
			for (var i = 0, size = urls.length; i < size; i++) {
			 	var url = urls[i];
			 	putRight(url, ent);
			}
		printUrls();
 		}
 	});
};

readFile();

