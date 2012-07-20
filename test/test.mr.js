var Database = require('../').Database;
var should = require('should');
var db = new Database();

var Step = require('step');

Step(
	function() {
		db.rpush('test',1,2,3,this);
	},
	function() {
		db.map('test',function(value,key) {
			return 0;
		},this);
	},
	function(err,mapped) {
		mapped.should.eql([0,0,0]);
	}
);