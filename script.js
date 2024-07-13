async function activateMicrophone() {
    try {
        // Request access to the microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Create a new audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create a media stream source from the stream
        const source = audioContext.createMediaStreamSource(stream);

        // Connect the source to the destination (speakers)
        source.connect(audioContext.destination);

        console.log('Microphone activated');
    } catch (error) {
        console.error('Error accessing the microphone:', error);
    }
}

function searchGoogleByImage(imageUrl) {
    // Construct the Google search URL for the image
    const searchUrl = `https://www.google.com/searchbyimage?image_url=${encodeURIComponent(imageUrl)}`;

    // Open the URL in a new tab/window
    window.open(searchUrl, '_blank');
}


function selectImage() {
    // Create an input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none'; // Hide the input element

    // Add event listener for file selection
    input.addEventListener('change', function() {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', function() {
                // Get the Base64-encoded image data
                const imageData = reader.result.split(',')[1];
                
                // Construct the Google search URL for the image
                const searchUrl = `https://www.google.com/searchbyimage?image_url=data:image/jpeg;base64,${imageData}`;

                // Open the URL in a new tab/window
                window.open(searchUrl, '_blank');
            });

            reader.readAsDataURL(file);
        }
    });

    // Trigger the file selection dialog
    input.click();
}


const URL = 'https://rss.cnn.com/rss/cnn_topstories.rss'; // Example RSS feed
var newscontain = document.getElementById("news-container");

$.getJSON("https:/\/newsdata.io/api/1/news?apikey=pub_291062b6363bed9f324d58b77d67c23b6864e&country=in&language=en&q=web%20series",
  function(data) {
    var newscollect = document.createElement("div");

    newscollect.className = "news-collect";
    
    

    for (i = 1; i < 20; i++)
    {

      // avoid displaying null values
      if (data.results[i] === null || data.results[i] === undefined)
        continue;

      if (data.results[i].image_url === null)
        continue;

      var news = document.createElement("div");
      var newsimg = document.createElement("img");
      var newstitle = document.createElement("p");
      var newslink = document.createElement("a");


      news.className = "news";
      newsimg.className = "news-img";
      newstitle.className = "news-title";
      newslink.className = "news-link";

      news.style.display = "block";

      newsimg.src = data.results[i].image_url;

      newstitle.innerText = data.results[i].title;

      newslink.href = data.results[i].link;

      news.appendChild(newsimg);
      news.appendChild(newstitle);

      newslink.appendChild(news);
      newscollect.appendChild(newslink);
    }
    newscontain.appendChild(newscollect);
  }
)