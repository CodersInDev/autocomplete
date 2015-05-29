var fs = require('fs');
var http = require('http');
var ac = {};

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

ac.stats = function (word, callback) {
  if (!ac.searches) {
    ac.searches = {};
  }
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
    if (ac.words[i].search(word) === 0) {
      found.push(ac.words[i]);
    }
  }
  return callback(null, found);
}

// ac.define = function (word, callback) {
//   var url = 'http://en.wiktionary.org/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&callback=?&page=' + word;
//   // var number = 2;
//   // http.get(url, function(res) {
//   //   console.log('Got response: ' + res.statusCode);
//   //   // console.log(res);
//   //   // number = 6;
//   //   callback(null, res);
//   //   // console.log(number);
//   //   console.log(res);
//   // })



// http.get(url, function(res) {
//     var body = '';

//     res.on('data', function(chunk) {
//       // console.log('chunk' + chunk);
//         body += chunk;
//         console.log(body);

//     });

//     res.on('end', function() {
//         var text = JSON.parse(body)
//         console.log("Got response: ", text);
//     });


//     callback(null, body);
    
//     // console.log(number);
//     // setTimeout(function(){
//     //   console.log(number);
//     // },3000);
 
    
// });

// }


ac.define = function (word, callback){
  var wordDef;
  var body = '';
  var url = 'http://en.wiktionary.org/w/api.php?action=query&titles=' + word +'&prop=revisions&rvprop=content&rvgeneratexml=&format=json';
  var request = http.get(url, function (response){
    response.on('data', function(chunk){
      // var miniChunk = chunk[]
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
