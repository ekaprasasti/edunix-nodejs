// Require Modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

// Array of Mime Types
var mimeTypes = {
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpeg",
	"png" : "image/png",
	"js" : "image/javascript",
	"css" : "text/css"
}

// Create Server
http.createServer(function() {
	var uri = url.parse(req.url).pathname;
	var filename = path.join(process.cwd(), unescape(uri));
	console.log('Loading' + uri);
	var stat;

	try {
		// asal beradanya file
		stats = fs.lstatSync(filename);
	}
	catch {
		// kalo ga ada file di sana
		res.writeHead(404, {'Content-type': 'text/plain'});
		res.write('404 Not Found');
		res.end();
		return;
	}
})