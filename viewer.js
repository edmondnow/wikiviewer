

//Search Box animation
$('input').click( function () {
  	$('h1').css("-ms-transition","all 0.30s ease-in-out");
  	$('h1').css("-moz-transition","all 0.30s ease-in-out");
	$('h1').css("-webkit-transition","all 0.30s ease-in-out");
  	$('h1').css("-o-transition","all 0.30s ease-in-out");
	$('h1').css("text-shadow","1.2px 1.2px #48A2FB")
});



$('#search').click( function () {
	triggerSearch();
});

function triggerSearch() {
	$(".result-container").remove();
	var searchItem = document.querySelector('input').value;
	apiCall(searchItem);
	
};


function displayResults(response){
	console.log(response)
;
	for(var i = 0; i<10; i++){
	var data = response.query.search[i];
	var newDiv =
		'<div class="wrapper-container" style="display: none">' + 	
		'<a href="https://en.wikipedia.org/?curid=' + data.pageid + '">' +
		'<div class="result-container" >' + '<h3 id="title">' + data.title + '</h3>' +
		'<p>' + data.snippet + '...' + '<p>' + '</div>' + '</div>';
	$(".container-hidden").append(newDiv);
	$(".wrapper-container").appendTo('.container').fadeIn('slow');
	}
}

$('#search-box').keypress(function(e){
	if (e.which==13){
	e.preventDefault();
	triggerSearch()
	}
	});


//Wiki Api CALL
function apiCall (searchItem) {
  $.ajax({ 
   url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchItem + "&prop=info&inprop=url&utf8=&format=json",
   dataType: "jsonp",
   success: function(response) {
       console.log(response.query);
       console.log(response.query.search[0].title);
       if (response.query.searchinfo.totalhits === 0) {
         writeError(keyword);
       }
       else {
         displayResults(response);
       }
  },
   error: function () {
    alert("Could not retrieve results, please refresh the page.");
   }
 
 });
}


