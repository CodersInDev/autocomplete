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
  var found = [];
  for (var i = 0; i < ac.words.length; i++) {
    if (ac.words[i].toLowerCase().indexOf(word.toLowerCase()) !== -1) {
      found.push(ac.words[i]);
    }
  }
  console.log('############');
  console.log(found);
  console.log('############');
  var found2 = stringSort(found, word.toLowerCase());
  console.log(found2);
  return callback(null, found2);
}

ac.define = function (word, callback) {
  //call the api here
  var def = "This is the definition for the word: " + word;
  return callback(null, def);
}



module.exports = ac;

//helper function for sorting results array

function stringSort(inputArray, term){
  var searchFirst,
      searchLast,
      defeatedArray = [];

  for (var i = 0; i < inputArray.length; i++) {
    if (inputArray[i].indexOf(term) === 0) {
        searchFirst = i;
        break;
    }
  }

    for (var j = inputArray.length -1; j >= 0; j--) {
      if (inputArray[j].indexOf(term) === 0) {
        searchLast = j;
        break;
      }
  }

  // defeatedArray.push(inputArray.slice(searchFirst,searchLast + 1)).push(), inputArray.slice(0, searchFirst), inputArray.slice(searchLast + 1))
  defeatedArray.push(inputArray.slice(searchFirst,searchLast + 1), inputArray.slice(0, searchFirst), inputArray.slice(searchLast + 1));
  defeatedArray = defeatedArray.reduce(function (a,b) {
    return a.concat(b);
  });
  return defeatedArray;
}
