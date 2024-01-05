//ELEMENT GRABS
var quoteID = document.getElementById("randomQuote");
var resultsEl = document.getElementById("searchResults");

//BookCover Img finder VARIABLES
var key; //will be filled with ISBN # to be put into getBookCoverImg()

//BookFinder API VARIBALES
var userTitle = document.getElementById("titleName");
var userAuthor = document.getElementById("authorName");
var userGenre = document.getElementById("genreDropdown")
var userIsbn = document.getElementById("isbnNumber");
var searchBtn = document.getElementById("searchBtn");
var finalTitalSearch;
var finalAuthorSearch;
var finalGenreSearch;
var vinalIsbnSearch;

//random dad joke API variables
const dadJokeUrl = "https://api.api-ninjas.com/v1/dadjokes?limit=1";
const dadJokeKey = "nlQ3c8edxYps70XkFFJ01A==lz0I0PYGLd2yIz4m";
const dadJokeOptions = {
    method: "GET",
    headers: {
        "X-Api-Key": dadJokeKey,
        "Content-Type": "application/json"
    }
}

fetch(dadJokeUrl, dadJokeOptions).then(function(response) {
    response.json().then(function(data) {
        //console.log(data);
        //set the quote element ID to joke text
        quoteID.textContent = data[0].joke;
    })
})

//Dynamic fetch requests based on user input
/*
THE PLAN
1. --capture user input into variables
2. dynamically modify the inputs to fit into API call required format .replace(" ", "+")
3. if there is an input, insert user search criteria into API url call
4. retrieve and parse data
5. use for loop to create new elements for each result and apply data
6. append new elements into resultsEl as <li> elements
7. BONUS include links in each <li> to buy the book
*/
function editUserInput(event) {
    event.preventDefault();
    // console.log(userAuthor.value);
    // console.log(userGenre.value);
    // console.log(userIsbn.value);
    //make a var to hold edited user input and remove all spaces to replace with +
    var newUserTitle = userTitle.value.replaceAll(" ", "+");
    //make a var to hold API search parameter
    var apiTitle = "&title=";
    //combine edited user input with API search parameter
    finalTitalSearch = apiTitle + newUserTitle; 
    //if the title search is empty, set the final search var to be empty
    if(userTitle.value == ""){
        finalTitalSearch = "";
    }
    console.log(finalTitalSearch);


    var newUserAuthor = userAuthor.value.replaceAll(" ", "+");
    var apiAuthor = "&author=";
    finalAuthorSearch = apiAuthor + newUserAuthor;
    if(userAuthor.value == ""){
        finalAuthorSearch = "";
    }
    console.log(finalAuthorSearch);


    var apiGenre = "&categories="
    var finalGenreSearch = apiGenre + userGenre.value;
    if(userGenre.value == "null"){
        finalGenreSearch = "";
    }
    console.log(finalGenreSearch);


    
}

function bookFinderApiCall() {
    //Book finder API variables
    const bookFinderUrl = 'https://book-finder1.p.rapidapi.com/api/search?' + finalTitalSearch + userAuthor + userGenre + userIsbn + '&results_per_page=25&page=1';
    const bookFinderOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90644bfaf3msh3f70b90b78393a7p18b0b2jsn280cd024c64a',
            'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
        }
    };
    
    //send a request out to Book Finder API and get a response
    fetch(bookFinderUrl, bookFinderOptions).then(function (response) {
        //console.log(response);
        //convert that response into a json object called data
        response.json().then(function (data) {
            console.log(data);
            //loop through all the results and apply cover images to each item
            key = data.results[2].canonical_isbn;
            getBookCoverImg(key);
        })
    })

}

//Function to grab book cover img from Open Library website
function getBookCoverImg (key) {
    const openLibraryUrl = "https://covers.openlibrary.org/b/ISBN/" + key + "-M.jpg";
    console.log(openLibraryUrl);

    //create img element and set src="above link"

}

searchBtn.addEventListener("click", editUserInput);