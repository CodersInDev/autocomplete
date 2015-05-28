var fs = require('fs');
var ac = {searches: {}};

ac.import = function (callback) {
  if (!callback || typeof callback !== 'function') {
    return new Error('callback argument MUST be a function')
  }
  var filename = __dirname + '/words.txt';
  fs.readFile(filename, 'utf8', function (err, data) {
    ac.words = data.split('\n');
    return callback(err, ac.words);
  });
}

// ac.define = funtion(word,callback){
//   call the api to have the definition
//   ac.stats(word, cb2);
// }


ac.stats = function (word, callback) {
  if (!ac.searches[word]) {
    ac.searches[word] = [];
  }
  ac.searches[word].push(new Date().getTime());
  callback(null, ac.searches);
}

ac.findWord = function (word, callback) {
  // who wants to volunteer to implement the method?
  var found = [];
  for (var i = 0; i < ac.words.length; i++) {
    if (ac.words[i].search(word.toLowerCase()) === 0) {
      found.push(ac.words[i]);
    }
  }
  return callback(null, found);
}

ac.define = function (word, callback) {
  //call the api here
  var def = "This is the definition for the word: " + word;
  return callback(null, def);
}



module.exports = ac;
