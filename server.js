var http = require('http');
var port = process.env.PORT || 3000;
var ac = require('./index.js');
ac.import(function(err, count) {
  console.log("imported a bunch of words! >> ", count.length);
});

var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');

http.createServer(function handler(request, response) {
  var url = request.url;
  console.log("request.url:", url);
  if (url.length === 1) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(index.toString());
  }

  if(url.indexOf('/find/') > -1) {
    // locahost:3000/find/word
    var word = url.split('/')[2];
    // console.log(word);
    ac.findWord(word, function (err, found){
      // console.log(found);
      response.end(found.join(','));
    });
    // response.end('word: ', word);
  }

  if(url.indexOf('/stat/') > -1){
    var word = url.split('/')[2];
    ac.stats(word, function (err, data){
      response.end(JSON.stringify(data));
    })
  }

  if(url.indexOf('/mydef/') > -1){
    var word = url.split('/')[2];
    ac.definition(word, function (err, data){
      response.end(data);
    });


  }
  // else{
  //   response.end('hello Dan!');
  // }

}).listen(port);

console.log('node http server listening on http://localhost:' + port);
