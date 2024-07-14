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


const RSSURL = 'https://rss.cnn.com/rss/cnn_topstories.rss'; // Example RSS feed
const NEWSURL = "https:/\/newsdata.io/api/1/news?apikey=pub_291062b6363bed9f324d58b77d67c23b6864e&country=in&language=en&q=web%20series"
var newscontain = document.getElementById("news-container");

$.getJSON(NEWSURL,
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

function searchGoogleByQuery() {
  var inputText = document.getElementById("searchbar-input");
  var query = inputText.value;
  var googleUrl = "https://google.com/search?q=";
  var finalUrl = ""

  try {
    new URL(query);
    finalUrl = query;
  } catch (err) {
    finalUrl = googleUrl + query;
  }

  window.open(finalUrl);
}

function startSpeechRecognition() {
  var micColor = "";
  // Check if the browser supports the Web Speech API
  if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support this feature.');
    return;
  }

  // Initialize the speech recognition object
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    micColor = $(".searchbar-microphone").css("color");


    $(".searchbar-microphone").css({
      background: "#F8F7FF",
      color: "black"
    });
  };

  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    $(".searchbar-input").val(result);
  };

  recognition.onerror = (event) => {
    $(".searchbar-microphone").css({
      background: "transparent",
      color: micColor
    });
    console.error('Speech recognition error:', event.error);
  };

  recognition.onend = () => {
    $(".searchbar-microphone").css({
      background: "transparent",
      color: micColor
    });
    console.log('Speech recognition ended');
  };

  // Start speech recognition
  recognition.start();
}

// Function to set the theme color
/*function setThemeColor(darkMode) {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (darkMode) {
        themeColorMeta.setAttribute('content', '#ff0000'); // Dark mode color
    } else {
        themeColorMeta.setAttribute('content', '#f8f7ff'); // Default color
    }
}

// Check if dark mode is enabled
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
setThemeColor(darkModeMediaQuery.matches);

// Add a listener to handle changes in the dark mode preference
darkModeMediaQuery.addListener((e) => {
    setThemeColor(e.matches);
});*/