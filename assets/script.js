//ELEMENT GRABS

//VARIABLES
var key;

//Book finder API variables
const bookFinderUrl = 'https://book-finder1.p.rapidapi.com/api/search?&title=Harry%20Potter&author=J.K.%20Rowling&results_per_page=25&page=1';
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
        key = data.results[2].canonical_isbn;
        getBookCoverImg(key);
    })
})

//Open Library book cover API
function getBookCoverImg (key) {
    const openLibraryUrl = "https://covers.openlibrary.org/b/ISBN/" + key + "-M.jpg";
    console.log(openLibraryUrl);

    //create img element and set src="above link"

}