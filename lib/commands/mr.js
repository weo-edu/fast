var _ = require('underscore');
var Ref = require('../ref');
var vm = require('vm');

/**
 * RPUSH <key> <iterator_func>
 */

exports.mapReduce = function(items, map, reduce){
	var data = {};
	function emit(key, vals){
		data[key] = data[key] || [];
		data[key].concat(vals);
	}
	_.invoke(items, map, [emit]);

	_.each(data, function(vals, key){
		data[key] = reduce(key, vals);
	});

	return data;
}

exports.filter = function(key, query){
	var items = this.data[key];
	_.filter(items, function(val){
	});
};

function test(query, val){
	_.each(query, function())
}

function test(query, val, op){
	op = op || '$eq';

	var pass = true;
	_.each(query, function(item, key){
		if(typeof item === 'object'){
			var sub = isOp(key) ? val : item;
			test(item, sub, op);
		}
		else{

		}
	});
}