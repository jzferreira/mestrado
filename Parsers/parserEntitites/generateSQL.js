/*
*
*	Gerar SQL
*
*/

var fs = require('fs');
var lineReader = require('line-reader');

//arquivo com as paginas e suas entidades
var srcTXT = '/Users/jzferreira/Projects/parserEntitites/paginas.txt';

//sql COMAND
var sql_command = 'INSERT INTO pages (src, path, e1, e2, e3, e4, e5, userid, name) VALUES ("$src", "$path", "$e1", "$e2", "$e3", "$e4", "$e5", $userid, "$name");' ;


var srcPages = '/jzferreira.com/mestrado/pages/';
var pathPage = 'pages/';


var pageName = 'page';
var formato = '.html';

var entityValue = {
	Nokia: {name: 'Nokia', value:'1'},
	Google: {name: 'Google', value:'2'},
	Microsoft: {name: 'Microsoft', value:'3'},
	Apple: {name: 'Apple', value : '4'},
	Samsung: {name: 'Samsung', value :'5'}
};

var contentSQL = [];



function format(txt) {

	var name = txt.split('=');
	var paginaName = name[0];
	var entidades = name[1].split(',');
	var objEntidades = {};

	for (var i = 0, limite = entidades.length; i < limite; i++) {
		objEntidades[entidades[i]] = '1';
	}

	var numberPage = paginaName.replace('pagina', '');

	name = pageName + numberPage + formato;
	
	var src = srcPages + name;
	var path = pathPage + name;

	var tempSQL = sql_command.replace('$src', src).replace('$path', path).replace('$userid', 0).replace('$name', '');


	for (key in entityValue) {

		if (objEntidades[entityValue[key].name] && typeof objEntidades[entityValue[key].name] != 'undefined') {
			var tempE = '$e' + entityValue[key].value;
			tempSQL = tempSQL.replace(tempE, entityValue[key].value);
		} else {
			objEntidades[key] = 'not';
		}
	}

	for (value in objEntidades) {

	 	if (objEntidades[value] == 'not') {
	 		tempSQL = tempSQL.replace('$e' + entityValue[value].value, '0');
	 	}
	 }

	console.log(tempSQL);

};


function main() {

	lineReader.eachLine(srcTXT, function(line) {
		format(line);
	}).then(function () {
		console.log('');
	});
};


main();