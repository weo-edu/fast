var Database = require('../').Database;
var should = require('should');
var database = new Database();

var insert = {test: 'test'}
database.set('test', insert, function(err) {
	database.get('test', function(err,result) {
		result.should.equal(insert);
	});
});


