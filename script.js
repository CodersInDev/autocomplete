//search event
$('#search').keyup(function(e) {
  var word = $('#search').val();
  if (word.length > 2) {
    $.get('/find/'+ word, function handler(data) {
      if(data === "") {
        $('#results').html("Nothing matched your search term");
      } else {
        var words = data.split(',');
        var results = '';
        for(var i=0; i < words.length; i++) {
          results += "<li class='resultItem'>" + words[i] + "</li>"
        }
        $('#results').html(results);
      }
// <<<<<<< HEAD
//       })// end of the search event
//       }else{
//         $('#results').html("");//empty the list search is deleted
//       }
//       });
// =======

      $('.resultItem').click(function(e){
        var term = e.target.innerHTML;

        $.get('/stat/'+ term, function handler(data){
          var wordStat = JSON.parse(data);
          var myArray = wordStat[term];
          var results = '';
          for(var i=0; i < myArray.length; i++) {
            results += "<li class='resultStat'>" + myArray[i] + "</li>"
          }
          $('#stats').html(results);
        });

        $.get('/define/'+ term, function handler(data){
          $("#wordDef").html(data);
        });


        $("#defWrap").show()

      });
    })
  }
});


//hide defWrap
$("#closeDefWrap").click(function(){
   $("#defWrap").hide()
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
