var _ = require('underscore');

/**
 * RPUSH <key> <value> [<value> ...]
 */

 (exports.rpush = function(){
 	var self = this;
 	var args = _.toArray(arguments);
 	var cb = args.pop();
 	var key = args.shift();
 	if (!this.data[key]) {
 		this.data[key] = {val: [], type: 'list'};
 	} else if (this.data[key].type != 'list') {
 		cb(new Error('wrong type'));
 		return;
 	} 
	_.each(args,function(arg) {
		self.data[key].val.push(arg);
	})
	cb(null);
}).mutates = true;


/**
 * LPUSH <key> <value> [<value> ...]
 */

 (exports.lpush = function(){
 	var self = this;
 	var args = _.toArray(arguments);
 	var cb = args.pop();
 	var key = args.shift();
 	if (!this.data[key]) {
 		this.data[key] = {val: [], type: 'list'};
 	} else if (this.data[key].type != 'list') {
 		cb(new Error('wrong type'));
 		return;
 	} 
	_.each(args,function(arg) {
		self.data[key].val.unshift(arg);
	})
	cb(null);
}).mutates = true;


/**
 * LPOP <key>
 */

(exports.lpop = function(key, cb) {
	if (!this.data[key]) {
		cb(null);
	} else if (this.data[key].type != 'list') {
		cb(new Error('wrong type'));
	} else {
		cb(null,this.data[key].val.shift());
	}
}).mutates = true;

/**
 * RPOP <key>
 */

(exports.rpop = function(key, cb) {
	if (!this.data[key]) {
		cb(null);
	} else if (this.data[key].type != 'list') {
		cb(new Error('wrong type'));
	} else {
		cb(null,this.data[key].val.pop());
	}
}).mutates = true;

/**
 * LINDEX <key> <index>
 */

exports.lindex = function(key, index, cb) {
	if (!this.data[key]) {
		cb(null);
	} else if (this.data[key].type != 'list') {
		cb(new Error('wrong type'));
	} else {
		cb(null,this.data[key].val[index]);
	}
};


/**
 * LSET <key> <index> <value>
 */

(exports.lset = function(key, index, value, cb) {
	if (!this.data[key]) {
		cb(null);
	} else if (this.data[key].type != 'list') {
		cb(new Error('wrong type'));
	} else {
		this.data[key].val[index] = value;
		cb(null);
	}
}).mutates = true;

/**
 * LTRIM <key> <start> <end>
 */

(exports.ltrim = function(key, start, end, cb) {
	if (!this.data[key]) {
		cb(null);
	} else if (this.data[key].type != 'list') {
		cb(new Error('wrong type'));
	} else {
		var arr;
		if (end < 0 ) end++;
		if (end)
				arr = this.data[key].val.slice(start,end);
		else 
				arr = this.data[key].val.slice(start);
		this.data[key].val = arr;
		cb(null);
	}
}).mutates = true;

/**
 * LRANGE <key> <start> <end>
 */

exports.lrange = function(key, start, end, cb) {
	if (!this.data[key]) {
		cb(null);
	} else if (this.data[key].type != 'list') {
		cb(new Error('wrong type'));
	} else {
		if (end < 0) end ++;
		if (end)
			cb(null,this.data[key].val.slice(start,end));
		else
			cb(null,this.data[key].val.slice(start));
	}
};

