//ELEMENT GRABS

//Book finder API calls
const bookFinderUrl = 'https://book-finder1.p.rapidapi.com/api/search?title=Percy%20Jackson&author=Rick%20Riordan&results_per_page=25&page=1';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '90644bfaf3msh3f70b90b78393a7p18b0b2jsn280cd024c64a',
		'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
	}
};

//send a request out to Book Finder API and get a response
fetch(bookFinderUrl, options).then(function(response){
   //console.log(response);
   //convert that response into a json object called data
   response.json().then(function(data){
    console.log(data);
   })
}) 

