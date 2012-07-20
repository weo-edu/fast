var _ = require('underscore');
var Ref = require('../ref');
var vm = require('vm');

/**
 * RPUSH <key> <iterator_func>
 */

exports.execStack = function(key,iterators,reduce) {
	for (var i = 0; i < iterators.length; ++i) {
		var next = i < iterators.length - 1 ? iterators[i++] : reduce;
		exports.map(iterators[i],next)
	}

	function emit(i,key,value) {
		var next = i < iterators.length - 1 ? iterators[i++] : reduce;
		next(value,emit.bind(i));
	}

	for(rows){
		map(item, emit.bind(0));
		for(maps){
			if(!map(function(){

			}))
				return;
		}
		for(reduces){

		}
	}

	while(entities){
		while(maps){
			maps.exec();
			maps.next();
		}
		while(reduces){
			reduces.exec();
			maps.
		}
		entities.next();
	}
}

exports.mapReduce = function(items, map, reduce){
	var data = {};
	function emit(key, vals){
		data[key] = data[key] || [];
		data[key].concat(vals);
	}
	_.each(items, function(val, idx){
		map.call(this, emit);
	})

	var results = {};
	_.each(data, function(vals, key){
		results[key] = reduce(key, vals);
	});

	return results;
}

exports.map = function(iterator, next) {
	var sandbox = {};
	var reduce = {};
	sandbox.deref = Ref.deref.bind(this);

	sandbox.emit = function(key,value) {

	}
	if ('function' === typeof iterator)
		iterator = iterator.toString();
	var code = "return " +iterator ";";
	var iterator = vm.runInNewContext(code,sandbox);
	console.log(iterator);
	var res = _.map(this.data[key],iterator);
	cb(null,res);
}


var pipe = db.pipe('test');
pipe.filter(function(val) {
	return val == 2
})
pipe.reduce(function(mem,val) {
	return mem+val;
},0)
pipe.exec(function() {

});


exports.mapReduce = function(key, map, reduce){
	var items = this.data[key];
	var res = {};
	for(var i = 0; i < items.length; i++){
		var cmaps = _.clone(maps);
		(function emit(key, item){
			var map = cmaps.shift();
			if(map)
				map(item, emit);
			else
				res[key] = reduce(key, item);
		})({}, items[i]);
	}
}