//ELEMENT GRABS

//VARIABLES


//Book finder API variables
const bookFinderUrl = 'https://book-finder1.p.rapidapi.com/api/search?title=Percy%20Jackson&author=Rick%20Riordan&results_per_page=25&page=1';
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
        //data[2].work_id
    })
})

//Google Books Images API variables
// const googleImgUrl = "https://www.googleapis.com/books/v1/volumes?q="
// const googleImgOptions = {
//     method: "GET"
// }


// fetch(googleImgUrl, googleImgOptions).then(function(response){
//     response.json().then(function(data){
//         console.log(data);
//     })
// })

//Open Library book cover API
const openLibraryUrl = "https://covers.openlibrary.org/b/$key/$value-$size.jpg";
const openLibraryOptions = {
    method: "GET"
}

fetch(openLibraryUrl, openLibraryOptions).then(function(response){
    response.json().then(function(data){
        console.log(data);
    })
})