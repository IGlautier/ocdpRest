var restify = require('restify');
var rqHandler = require('./rqHandler.js');

var server = restify.createServer();

server.get('/device/name/:name', rqHandler.name);
server.head('/device/name/:name', rqHandler.name);

server.get('/device/type/:type', rqHandler.type);
server.head('/device/type/:type', rqHandler.type);

server.get('/device/manufacturer/:name', rqHandler.manufacturer);
server.head('/device/manufacturer/:name', rqHandler.manufacturer);

server.get('/device/last/:n', rqHandler.last);
server.head('/device/last/:n', rqHandler.last);

server.get('/device/all', rqHandler.all);
server.head('/device/all', rqHandler.all);

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});