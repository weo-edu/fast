/**
 * GET <key>
 */

exports.get = function(key, cb){
  var obj = this.lookup(key);
  if (!obj) {
  	cb(null);
  } else if ('object' != obj.type) {
  	cb(new Error('type error'));
  } else {
  	cb(null,obj.val);
  }
};

/**
 * SET <key> <obj>
 */

(exports.set = function(key, obj, cb){
  this.data[key] = { val: obj, type: 'object' };
  cb(null);
}).mutates = true;