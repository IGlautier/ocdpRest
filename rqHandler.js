/* Require any databases here */
var cradle = require('cradle');

/* Database setup */
var con = new(cradle.Connection)('http://localhost', 5984, {
	auth: { username: 'node', password: 'dbp4sS123' },
	cache: true,
	raw: false,
	forceSave: true
  });

var devices = con.database('device');

/* Get device by name */
exports.name = function name(req, res, next) {

	devices.view('devicelist/single', {key: req.params.name}, function (err, data) {
	
		if(err) res.sendStatus(404);
		
		else res.send(data[0].value);
		
	});
	
	next();
}

/* Get device by type */
exports.type = function type(req, res, next) {

	devices.view('devicelist/type', {key: req.params.type}, function (err, data) {
	
		if(err) res.sendStatus(404);
		
		else res.send({number: data.rows.length, devices: data.rows});
		
	});
	
	next();
}

/* Get device by manufacturer */
exports.manufacturer = function manufacturer(req, res, next) {

	devices.view('devicelist/manufacturer', {key: req.params.name}, function (err, data) {
	
		if(err) res.sendStatus(404);
		
		else res.send({number: data.row.length, devices: data.rows});
		
	});
	
	next();
}

/* Get last n devices */
exports.last = function last(req, res, next) {

	devices.view('devicelist/all', function (err, data) {
	
		if(err) res.sendStatus(404);
		
		else {
		
			if (req.params.n > data.total_rows) req.params.n = data.total_rows;
			
			res.send({number: req.params.n, devices: data.rows.slice(0,req.params.n)});
		}
	});
	
	next();
}

/* Get all devices */
exports.all = function all(req, res, next) {

	devices.view('devicelist/all', function (err, data) {
	
		if(err) res.sendStatus(404);
		
		else res.send({number: data.total_rows, devices: data.rows});
		
	});
	
	next();
}
