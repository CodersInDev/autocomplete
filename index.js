var fs = require('fs');
var ac = {searches: {}};
var http = require('http');

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

ac.define = function (word, callback){
  var wordDef;
  var body = '';
  var url = 'http://en.wiktionary.org/w/api.php?action=query&titles=' + word +'&prop=revisions&rvprop=content&rvgeneratexml=&format=json';
  var request = http.get(url, function (response){
    response.on('data', function(chunk){
    body+=chunk;
    console.log(body);
    });
    response.on('end', function(){
      if(response.statusCode === 200){
        wordDef = body;
        console.log(wordDef);
        return callback(null, wordDef);
      }
    })
  });
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
