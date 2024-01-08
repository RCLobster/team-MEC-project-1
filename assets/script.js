//ELEMENT GRABS
var quoteID = document.getElementById("randomQuote");
var resultsEl = document.getElementById("searchResults");
var saveJokeBtn = document.getElementById("saveJokeBtn");
var viewJokesBtn = document.getElementById("viewJokesBtn");
var savedJokeModalText = document.getElementById("modal-text");
var clearJokesBtn = document.getElementById("clearJokesBtn");

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

fetch(dadJokeUrl, dadJokeOptions).then(function (response) {
    response.json().then(function (data) {
        //console.log(data);
        //set the quote element ID to joke text
        quoteID.textContent = data[0].joke;
        quoteID.style.margin = "5px";
    })
})

//Dynamic fetch requests based on user input

function editUserInput(event) {
    event.preventDefault();
    // FIGURE OUT HOW TO ADD ONLY ONE + REGARDLESS OF HOW MANY SPACES

    //make a var to hold edited user input and remove all spaces to replace with +
    var newUserTitle = userTitle.value.replaceAll(" ", "+");
    //make a var to hold API search parameter
    var apiTitle = "&title=";
    //combine edited user input with API search parameter
    finalTitalSearch = apiTitle + newUserTitle;
    //if the title search is empty, set the final search var to be empty
    if (userTitle.value == "") {
        finalTitalSearch = "";
    }
    //console.log(finalTitalSearch);


    var newUserAuthor = userAuthor.value.replaceAll(" ", "+");
    var apiAuthor = "&author=";
    finalAuthorSearch = apiAuthor + newUserAuthor;
    if (userAuthor.value == "") {
        finalAuthorSearch = "";
    }
    //console.log(finalAuthorSearch);


    console.log(userGenre.value);
    var apiGenre = "&categories="
    finalGenreSearch = apiGenre + userGenre.value;
    if (userGenre.value == "null") {
        finalGenreSearch = "";
    }
    //console.log(typeof finalGenreSearch);

    bookFinderApiCall();
}

function bookFinderApiCall() {
    //Book finder API variables
    const bookFinderUrl = 'https://book-finder1.p.rapidapi.com/api/search?' + finalTitalSearch + finalAuthorSearch + finalGenreSearch + '&results_per_page=25&page=1';
    console.log(bookFinderUrl);
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

            //clear the results div ul before filling with new searches
            resultsEl.innerHTML = "";
            for (var x = 0; x < data.results.length; x++) {
                //create the parent <li> element
                var listEl = document.createElement("li");
                //create an ID for this <li>
                listEl.setAttribute("id", "resultParentLi");
                //add dynamic styles as elements are created
                listEl.style.margin = "10px";
                listEl.style.padding = "10px";
                listEl.style.border = "2px solid black";
                listEl.style.borderRadius = "20px";
                listEl.style.listStyleType = "none";

                //create a title element with <h3>
                var titleEl = document.createElement("h3");
                //set an ID for this h3 title element
                titleEl.setAttribute("id", "resultTitle");
                //set the text of h3 to the title in results[x]
                titleEl.textContent = data.results[x].title;

                //create an element to hold author name
                var authorEl = document.createElement("p");
                //set the text of element to authors in results[x]
                //I used innHTML so that Author: could be wrapped with strong tags
                authorEl.innerHTML = "<strong>Author: </strong>" + data.results[x].authors;

                var seriesEl = document.createElement("p");
                //check if results[x].series_name is NOT null before filling the innerHTML, if it IS null, do not write anything to webpage
                if (data.results[x].series_name !== null) {
                    seriesEl.innerHTML = "<strong>Series: </strong>" + data.results[x].series_name;

                }

                var genreEl = document.createElement("p");
                //find a way to make the subcategories NOT bold
                genreEl.innerHTML = "<strong>Genre: " + data.results[x].subcategories;

                var summaryEl = document.createElement("p");
                summaryEl.innerHTML = "<strong>Summary: </strong>" + data.results[x].summary;

                var pageCountEl = document.createElement("p");
                pageCountEl.innerHTML = "<strong>Page Count: </strong>" + data.results[x].page_count;

                var copyrightEl = document.createElement("p");
                copyrightEl.innerHTML = "<strong>Copyright: </strong>" + data.results[x].copyright;

                var isbnEl = document.createElement("p");
                isbnEl.innerHTML = "<strong>ISBN Number: </strong>" + data.results[x].canonical_isbn;

                //using the results[x] isbn number, make a call to openlibrary to grab a cover img based on the isbn
                key = data.results[x].canonical_isbn;
                const openLibraryUrl = "https://covers.openlibrary.org/b/ISBN/" + key + "-M.jpg";
                //console.log(openLibraryUrl);

                //create img element and set src="above link" to add found cover img into the <img> element
                var coverImgEl = document.createElement("img");
                coverImgEl.setAttribute("src", openLibraryUrl);
                //console.log(coverImgEl.width);

                listEl.appendChild(titleEl);
                listEl.appendChild(coverImgEl);
                listEl.appendChild(authorEl);
                listEl.appendChild(seriesEl);
                listEl.appendChild(genreEl);
                listEl.appendChild(summaryEl);
                listEl.appendChild(pageCountEl);
                listEl.appendChild(copyrightEl);
                listEl.appendChild(isbnEl);

                resultsEl.appendChild(listEl);
            }
        })
    })
}


function clearJokeStorage() {
    localStorage.clear();
}

function viewSavedJokes() {
    //empty the modal contents
    savedJokeModalText.innerHTML = "";
    //grab all jokes currently saved in localStorage
    var jokesToDisplay = JSON.parse(localStorage.getItem("savedJokes"));
    //create new <ul> element under the #modal-text div
    var ulEl = document.createElement("ul");
    //loop through jokesToDisplay[] and create elemnets for each joke saved in localStorage
    for(x=0; x<jokesToDisplay.length; x++) {
        var liEl = document.createElement("li");
        //add dynamic styling
        liEl.style.listStyleType = "arabic";
        liEl.style.margin = "5px";
        liEl.style.padding = "3px 0px";
        liEl.style.borderBottom = "2px solid gray";
        var pEl = document.createElement("p");
        pEl.textContent = jokesToDisplay[x];
        //append all the pieces together
        liEl.appendChild(pEl);
        ulEl.appendChild(liEl);
        //append the assembled pieces onto the modal
        savedJokeModalText.appendChild(ulEl);
    }
}

function saveJoke() {
    //grab whatever jokes are saved in local storage
    var jokeToSave = JSON.parse(localStorage.getItem("savedJokes"));
    console.log(jokeToSave);
    //if nothing is saved, set array equal to an empty array
    if (jokeToSave === null){
        jokeToSave = [];
    }
    //push the currently displayed joke into jokeToSave[]
    jokeToSave.push(quoteID.textContent);
    //re-save jokeToSave array into localStorage
    localStorage.setItem("savedJokes", JSON.stringify(jokeToSave));
}


clearJokesBtn.addEventListener("click", clearJokeStorage);
viewJokesBtn.addEventListener("click", viewSavedJokes);
saveJokeBtn.addEventListener("click", saveJoke);

searchBtn.addEventListener("click", editUserInput);