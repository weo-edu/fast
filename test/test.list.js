var Database = require('../').Database;
var should = require('should');
var db = new Database();

var Step = require('step');

Step(
	function() {
		db.rpush('test',1, this);	
	},
	function(err) {
		if (err) throw err
		db.rpush('test', 2, this);
	},
	function(err) {
		if (err) throw err;
		db.lrange('test',0,-1,this);
	},
	function(err,range) {
		if (err) throw err;
		range.should.eql([1,2]);
		db.lpush('test',0,this);
	},
	function(err) {
		if (err) throw err;
		db.lrange('test',0,-1,this);
	},
	function(err,range) {
		if (err) throw err;
		range.should.eql([0,1,2]);
		db.lpop('test',this);
	},
	function(err) {
		if (err) throw err;
		db.lrange('test',0,-1,this);
	},
	function(err,range) {
		if (err) throw err;
		range.should.eql([1,2]);
		db.rpop('test',this);
	},
	function(err) {
		if (err) throw err;
		db.lrange('test',0,-1,this);
	},
	function(err,range) {
		if (err) throw err;
		range.should.eql([1]);
		db.lindex('test',0,this)
	},
	function(err,val) {
		val.should.eql(1);
		db.lset('test',0,2,this);
	},
	function(err) {
		if (err) throw err;
		db.lindex('test',0,this);
	},
	function(err,val) {
		val.should.eql(2);
		db.rpush('test',3,this);
	},
	function(err) {
		db.ltrim('test',1,-1,this);
	},
	function(err) {
		db.lrange('test',0,-1,this);
	},
	function(err,range) {
		range.should.eql([3]);
	}
)

