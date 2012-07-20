var commands = require('./commands')
  , fs = require('fs')
  , ss = require('super-sockets')
  , Parser = ss.Parser;

/**
 * Commands which mutate the database.
 *
 * Nedis needs to know about these for the append-only log,
 * since there is little need to re-play commands that simply
 * fetch data :)
 * 
 * TODO: flushall / flushdb and friends can probably be highly
 * optimized, and wipe out the AOF all together.
 */

var mutate = [];

Object.keys(commands).forEach(function(cmd){
  var fn = commands[cmd];
  if (fn.mutates) mutate.push(cmd);
});

/**
 * Initialize a new `Database` with the given `server` and `options`.
 *
 * Options:
 *
 *   `filename`   Append-only file path
 *
 * @param {Server} server
 * @param {Object} options
 */

var Database = module.exports = function Database(server, options) {
  options = options || {};
  this.filename = options.filename || process.cwd() + '/nedis.db';
  this.stream = fs.createWriteStream(this.filename, { flags: 'a' });
  this.data = {};
  this.aof_write = true;
};

/**
 * Expose commands to store.
 */

Database.prototype = commands;

/**
 * Lookup `key`
 *
 * @param {String} key
 * @return {Object}
 */

Database.prototype.lookup = function(key){
  var obj = this.data[key];
  return obj;
};

/**
 * Invoke `cmd` with `args` and reset state.
 *
 * @param {String} cmd
 * @param {Array} args
 */

Database.prototype.invoke = function(msg,options,callback){
  //start: "invoke " + cmd
  if ('function' == typeof options) {
    callback = options;
    options = {};
  }

  callback = callback || function(){};
  // Write to database
  if (options.write) this.writeToAOF(msg);
  msg.args.push(callback);
  this[msg.cmd].apply(this,msg.args)
};

/**
 * Parse message
 * 
 * @param {Object} msg
 */


 /**
 * Write the given `cmd`, and `args` to the AOF.
 *
 * @param {String} cmd
 * @param {Array} args
 */

Database.prototype.writeToAOF = function(msg,force){
  if (!~mutate.indexOf(msg.cmd)) return;

  var stream = this.stream
    , code = this.parser.codec;

  if (force || this.aof_write) {
    stream.write(this.parser.pack(codec.encode(msg), codec.id));
  } else {
    this.aof_buffer.push(msg);
  }
};

/**
 * Flush aof buf to aof file
 */

Database.prototype.flushAOFbuf = function() {
  var buf = this.aof_buffer;
  var len = buf.len;
  this.aof_buffer = [];
  for (var i = 0; i < len; ++i) {
    this.writeToAOF(buf[i],true);
  }
}

/**
 * Replay the AOF.
 */

Database.prototype.replayAOF = function(){
  var self = this;
  this.aof_write = false;
  var stream = fs.createReadStream(self.filename);
  var parser = new Parser;
  stream.on('data', parser.write.bind(parser));
  stream.on('end', function(){
    self.flushAOFbuf();
    self.aof_write = true;
  });
  parser.onmessage = function(msg) {
    self.invoke(msg,{write: false})
  }

};



