console.log("test function")

test('Search for word containing awes', function(assert){
  var done = assert.async();
  $.get('/find/awes', function handler(data) {
    var words = data.split(',');
    assert.equal(words.length, 12, 'number of suggestions for awes is 4');
    done();
  });
});

test("search is NOT case-sensitive", function(assert){
  var done = assert.async();
  $.get('/find/AWES', function handler(data) {
    var words = data.split(',');
    assert.equal(words.length, 4, 'number of suggestions for AWES is 4');
    done();
  });
});

test("Searching for qqq returns 'no search results' message", function(assert){
  var done = assert.async();
  $.get('/find/qqq', function handler(data) {
    assert.equal(data, "", 'no results');
    done();
  });
});

test("Clicking on a word increases # of times it's been searched for in the stats", function(assert){
  var done = assert.async();
  var number = 0;
  $.get('/stat/fake', function handler(data){
    var obj = JSON.parse(data);
    number = obj['fake'].length;
    $.get('/stat/fake', function handler(data){
      var obj = JSON.parse(data);
       assert.equal(obj['fake'].length, number + 1, "the stat is right")
       done();
    });
  });
});

// test("clicking on a word brings up an info", function(){

// });

