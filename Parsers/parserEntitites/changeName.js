

var fs = require('fs');

var inicio = 228;

var dirInput = '/Users/jzferreira/Projects/parserEntitites/paginas/';
var dirOutput = '/Users/jzferreira/Projects/parserEntitites/finalPages/';
var fileInput = '/Users/jzferreira/Projects/parserEntitites/pagesB1.txt';


function readFile(pathFile) {
	return fs.readFileSync(pathFile, 'utf-8');
}


function saveNewFile(name, txt) {
	fs.writeFileSync(dirOutput + name, txt, 'utf-8');
}

var main = (function () {


	var files = fs.readdirSync(dirInput);
	files.forEach(function (element, index) {
		console.log('Reading file: ' + element);
		var content = readFile(dirInput + element);
		var name = element.replace('pagina', 'page');
		console.log('Writting new file....' + name);
		saveNewFile(name, content);
		console.log('#########################');
		//inicio++;
	});
})();