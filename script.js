//search event
$('#search').keyup(function(e) {
  var word = $('#search').val();
  if (word.length > 2) {
    $.get('/find/'+ word, function handler(data) {
      if(data === "") {
        $('#results').html("Nothing matched your search term");
      } else {
        console.log(data);
        var words = data.split(',');
        var results = '';
        console.log(words);
        for(var i=0; i < words.length; i++) {
          results += "<li class='resultItem'>" + words[i] + "</li>"
        }
        console.log(results);
        $('#results').html(results);
      }
    });
  }else{
        $('#results').html("");//empty the list search is deleted
  }
});

$('#results').click(function(e){
  var term = e.target.innerHTML;
  $("#defWrap").show(300);
  $.get('/stat/'+ term, function handler(data){
    var wordStat = JSON.parse(data);
    var myArray = wordStat[term];
    // var results = '';
    // for(var i=0; i < myArray.length; i++) {
    //   results += "<li class='resultStat'>" + myArray[i] + "</li>"
    // }

    $('#stats').html("The number of times that " + term + " has been searched for is: " + myArray.length);

    $.get('/define/'+ term, function handler(data){
      $("#wordDef").html(data);
    });


  });
});




//hide defWrap
$("#closeDefWrap").click(function(){
   $("#defWrap").hide(300);
})


// //Event on navigation tab
// searchTab.addEventListener('click', searchClick);
// statsTab.addEventListener('click', statsClick);

// function statsClick() {
//   document.getElementById('stats').style.display = "block";
//   document.getElementById('searchContent').style.display = 'none';
// }

// <<<<<<< HEAD
//       $("#results").click(function(e){
//         var term = e.target.innerHTML;
//         $.get('/stat/'+ term, function handler(data){
//           var wordStat = JSON.parse(data);
//           var myArray = wordStat[term];
//           var results = '';
//
//           for(var i=0; i < myArray.length; i++) {
//             results += "<li class='resultStat'>" + myArray[i] + "</li>"
//           }
//
//           $('#stats').html(results);
//         });
// =======
// function searchClick() {
//   document.getElementById('searchContent').style.display = 'block';
//   document.getElementById('stats').style.display ="none";
// }


  //  })
