var http = require('http'),
    port = process.env.PORT || 3000,
    ac = require('./index.js'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/index.html'),
    action,
    word;

//initialize the list of words
ac.import(function(err, count) {
});

function getUrlAction(url){
  return url.split('/')[1];
}

function getUrlWord(url){
  return url.split('/')[2];
}

http.createServer(function handler(request, response) {
  var url = request.url;
  getUrlAction(url);
  if (url.length === 1) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(index.toString());
  }else{
    action = getUrlAction(url);
    word = getUrlWord(url);
    switch(action){
      case 'find':
        ac.findWord(word, function (err, found){
          response.end(found.join(','));
        });
        break;
      case 'stat':
        ac.stats(word, function (err, data){
          response.end(JSON.stringify(data));
        })
        break;

      case 'define':
        ac.define(word, function (err, data){
          response.end(data.toString());
        });
        break;

      default:
        //try to load file
        fs.readFile(__dirname + url, function(err, data){
            if (err){
                response.end("Can't load the ressource!");
            } else {
                var ext = url.split('.')[1];
                response.writeHead(200, {'Content-Type' : 'text/' + ext});
                response.end(data);
            }
        });
      }
    }
}).listen(port);
