// Function to perform the YouTube API request
function searchYouTube(query) {
    var apiKey = process.env.API_KEY; // Replace with your own YouTube API key
    var maxResults = 1; // Number of search results to retrieve
  
    // Create the API request URL with sorting parameters
    var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}&q=${encodeURIComponent(
      query
    )}&maxResults=${maxResults}&order=viewCount`;
  
    // Make the API request
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Process the API response and display the result
        if (data.items.length > 0) {
          displayResult(data.items[0]);
        } else {
          console.log('No video found.');
        }
      })
      .catch(function (error) {
        console.log('An error occurred:', error);
      });
  }
  
  // Function to display the search result on the webpage
  function displayResult(result) {
    var searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = ''+"<br>"; // Clear previous result
  
    var videoId = result.id.videoId;
   
    var title = result.snippet.title;
    
    var thumbnail = result.snippet.thumbnails.default.url;
  
    // Create HTML elements to display the video information
    var videoElement = document.createElement('div');
    var linkElement = document.createElement('a');
    var thumbnailElement = document.createElement('img');
    var titleElement = document.createElement('span');
  
    // Set attributes and content
    linkElement.href = `https://www.youtube.com/watch?v=${videoId}`;
    linkElement.target = '_blank';
    thumbnailElement.src = thumbnail;
    thumbnailElement.alt = title;
    titleElement.textContent = title;
  
    // Append elements to the container
    linkElement.appendChild(thumbnailElement);
    linkElement.appendChild(titleElement);
    videoElement.appendChild(linkElement);
    searchResultsContainer.appendChild(videoElement);
  }
  
  // Rest of the code remains the same...
  
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    var query = document.getElementById('searchInput').value; // Get the search query
  
    // Call the function to perform the YouTube API request
    searchYouTube(query);


  }

  document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the form submission
    document.getElementById('searchForm').addEventListener('submit', handleFormSubmit);
  });