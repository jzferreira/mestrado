/*
 * Source code information
 * -----------------------
 * Original author    Javier Zambrano Ferreira, Nokia Institute of Technology
 * Author email       javier.ferreira@indt.org.br
 * Personal Website   http://www.jzferreira.com
 * Created            01-19-2012
 * Filename           wget
 * Revision            1.0
 * Release status     State:
 *
 * Last modified
 * -----------------------
 * Date: 01-19-2012 Author: Javier Zambrano Ferreira
 * Description: This is the first version of this wget.
 *
 * Copyright (c) 2012 Nokia Technology Institue. All rights reserved.
 */

var http = require('http');
var sys = require('sys');
var util = require('util');
var fs = require('fs');
var url = require('url');


var wget = (function () {

	var saveContent = function (options) {
	  	if (options.content) {
		  	var localFile = fs.open(options.file, 'a', 0666, function(e, id) {
		    
		      console.log('file open: ' + options.file + '\nwrite content....');
		    
		      fs.write(id, options.content, null, null, null, function (err, written, buffer) {
		        if (err) throw err;
		        console.log('content saved...');
		        fs.close(id, function() {
		          console.log('file closed');
		        });
		      });
		    });
	  	} 
	};
	
	var request = function (options) {
		
		console.log('url: ' + options.url + ' | Filename:' + options.file);

  		var domain = url.parse(options.url);
  		
		var requestOptions = {
			host: domain.host,
			port: 80,
			path: domain.pathname,
			method: 'GET'
		};


		var req = http.request(requestOptions, function (response) {
			
			response.setEncoding('utf-8');
		    
		    var body = '';
		    
		    response.on('data', function(chunk) {
		    	//each data will be add in body
		      body += chunk;
		    });

		     response.on('end', function() {
		     	//end of request
		     	saveContent.call(this, {
		     		content: body,
		     		file: options.file
		     	});
		     });
		
		});

		req.on('error', function(e) {
      		console.log('problem with request: ' + e.message);
    	});

    	/*Close request*/
    	req.end();
	};

	return {
		request: request
	};

})();


var main = function() {

	var options = {
		'url': '',
		'file': ''	
	};

	process.argv.forEach(function (val, index, array) {
		if (index === 2) {
			options.url = val;
		} else {
			if (index === 3) {
				options.file = val;
			}
		}
	});

	wget.request(options);
};

main();