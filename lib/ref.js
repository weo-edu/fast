exports.ref = function(key) {
	return key;
}

exports.deref = function(database,str) {
	return databse.get(str);
}