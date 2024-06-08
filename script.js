/* github username: @vikramisdev */

var settingIsOpen = false;
var g_url = "https:/\/google.com/search?q=";
var y_url = "https:/\/youtube.com/results?search_query=";
var i_url = "https:/\/instagram.com/";

var url = g_url;

var icon = document.getElementById("search-icon");
var input = document.getElementById("search");
var setting = document.getElementById("setting");
var dropmenu = document.querySelector(".dropmenu");
var body = document.querySelector("body");
var dropmenucat = document.querySelectorAll(".dropmenu h4");
var counter = document.querySelector(".counter");
newscontain = document.getElementById("news-container");
var notifycardcross = document.querySelector(".button-info-x");
var notifycard = document.querySelector(".button-info");
var searchName = document.querySelector(".searchbar h2");
var infocard = getCookie("infocard");

var settings_bottomsheet_open = false;
var profile_bottomsheet_open = false;



// cookie functions
function setCookie(key, value) {
  document.cookie = key + "=" + value + ";" + "Path=/;";
}


function getCookie(key) {
  var cookiedict = new Map();
  for (var ck of document.cookie.split(";"))
  {
    let cks = ck.trim().split('=');
    cookiedict.set(cks[0], cks[1]);
  }
  return cookiedict.get(key);
}

function delCookie(key) {
  var text = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/;";
  document.cookie = text;
}
// end



// enable enter key from virtual keyboard
document.addEventListener("keypress", function(event) {
  if (event.key === 'Enter') {
    open_url();
  }
});
// end



// open google, youtube, instagram urls
function open_url() {
  if (input.value)
  {
    let iconclass = icon.classList;
    if (iconclass.contains("bi-search"))
    {
      url = g_url;
      document.cookie = "icon=bi-search";
    }
    else if (iconclass.contains("bi-youtube"))
    {
      url = y_url;
      document.cookie = "icon=bi-youtube";
    }
    else if (iconclass.contains("bi-instagram"))
    {
      url = i_url;
      document.cookie = "icon=bi-instagram";
    }

    window.open(url + input.value, "_blank");
    animate_icon();
  }
  else
    console.log(input.value);
}
//



// change search button icon
function changeicon() {
  iconlist = icon.classList;

  if (iconlist.contains("bi-search"))
  {
    icon.classList.replace("bi-search", "bi-google");
    url = g_url;
    input.placeholder = "Search on Google";
  }
  else if (iconlist.contains("bi-google"))
  {

    icon.classList.replace("bi-google", "bi-youtube");
    url = y_url;
    input.placeholder = "Search on Youtube";
  }
  else if (iconlist.contains("bi-youtube"))
  {
    icon.classList.replace("bi-youtube", "bi-instagram");
    url = i_url;
    input.placeholder = "Search on Instagram";
  }
  else if (iconlist.contains("bi-instagram"))
  {
    icon.classList.replace("bi-instagram", "bi-search");
    url = g_url;
    input.placeholder = "Search it";
  }
}
// end



// animate search icons
function animate_icon() {
  icon.animate(
        [
      { transform: "rotate(360deg)" },
        ],

    {
      duration: 500,
      iterations: 3
    }
  );
}
// end



// don't use my news api key :)
// get your own api at `newsapi.org`
// by registering there.

// generate news templates
$.getJSON("https:/\/newsdata.io/api/1/news?apikey=pub_29106f05acffd4eecaca1c36a1cb0df485ce7&country=in&language=en&q=web%20series",
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
// end


// handle bottom sheets
function toggle_bottomsheet(bottom_value, settings = true) {
  var transition_length = 300;

  if (settings) {
    $(".settings-bottomsheet").animate({
        bottom: bottom_value
      },
      transition_length);
  }
  else {
    $(".profile-bottomsheet").animate({
        bottom: bottom_value
      },
      transition_length);
  }


}

$(document).ready(function() {
  // Cache DOM elements
  var $settingsBottomSheet = $(".settings-bottomsheet");
  var $profileBottomSheet = $(".profile-bottomsheet");
  var $searchbarSetting = $(".searchbar-setting");
  var $searchbarProfile = $(".searchbar-profile");
  var $profileBottomsheetName = $(".profile-bottomsheet-name");
  var $newsContainer = $(".news-container");
  var $toggleNewsVisibilitySwitch = $(".toggle-news-visibility-switch");

  // Constants
  var TRANSITION_LENGTH = 300;

  // Variables to track bottom sheet state
  var isSettingsOpen = false;
  var isProfileOpen = false;

  // Function to toggle bottom sheet
  function toggleBottomSheet($bottomSheet, isOpen) {
    var bottomValue = isOpen ? "0px" : "-100%";
    $bottomSheet.animate({ bottom: bottomValue }, TRANSITION_LENGTH);
  }

  // Event listener for settings button
  $searchbarSetting.click(function() {
    if (isProfileOpen) {
      toggleBottomSheet($profileBottomSheet, false);
      isProfileOpen = false;
    }
    toggleBottomSheet($settingsBottomSheet, !isSettingsOpen);
    isSettingsOpen = !isSettingsOpen;
  });

  // Event listener for profile button
  $searchbarProfile.click(function() {
    if (isSettingsOpen) {
      toggleBottomSheet($settingsBottomSheet, false);
      isSettingsOpen = false;
    }
    toggleBottomSheet($profileBottomSheet, !isProfileOpen);
    isProfileOpen = !isProfileOpen;
  });

  // Event listener for closing settings bottom sheet
  $(".settings-bottomsheet-useless").click(function() {
    toggleBottomSheet($settingsBottomSheet, false);
    isSettingsOpen = false;
  });

  // Event listener for closing profile bottom sheet
  $(".profile-bottomsheet-useless").click(function() {
    toggleBottomSheet($profileBottomSheet, false);
    isProfileOpen = false;
  });

  $(".profile-bottomsheet-profile-pic").click(function() {
    var pic = getCookie("user-profile-pic");

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    fileInput.click();

    fileInput.addEventListener("change", function(event) {
      let files = event.target.files;
      let file;
      
      if(files.length > 0) {
        file = files[0];
      }
      
      if(file.type.includes("image")) {
        const fileUrl = URL.createObjectURL(file);
        prompt("Url", fileUrl);
      }
    });

  });

  // set the defualt name if not set by user
  if (getCookie("user-name") != null) {
    $profileBottomsheetName.text(getCookie("user-name"));
  }
  else {
    $profileBottomsheetName.text("Unknown");
  }
  
  $(".profile-bottomsheet-name").click(function() {
    var name = prompt("Enter you name: ");
    if (name) {
      setCookie("user-name", name);
      $(this).text(name);
    }
  });
  
  $(".profile-bottomsheet-header li").click(function() {
    toggleBottomSheet($profileBottomSheet, false);
    isProfileOpen = false;
  });
  
  if(getCookie("news-enabled") != null) {
    if(getCookie("news-enabled") == "true") {
      $newsContainer.show();
    }
    else  {
      $newsContainer.hide();
    }
  }
  
  $(".toggle-news-visibility-switch").click(function() {
    // clicked to turn off the discovery

    $newsContainer.toggle();
    $(this).toggleClass("bi-toggle-on bi-toggle-off");
    $(this).toggleClass("switch-green switch-normal");
  });
});

function isDayTime() {
  const hours = new Date().getHours();

  // Check if it is between 6am and 8pm.
  const isDaytime = hours >= 6 && hours < 20;

  // Display the result.
  if (isDaytime) {
    return true;
  } else {
    return false;
  }
}
// end

//start
var darkmodeIcon = $(".searchbar-darkmode-icon");

if (!isDayTime()) {
  darkmodeIcon.removeClass("bi-sun-fill");
  darkmodeIcon.addClass("bi-moon-stars-fill");
  darkmodeIcon.css("color", "lightblue");
}
else {
  darkmodeIcon.removeClass("bi-moon-stars-fill");
  darkmodeIcon.addClass("bi-sun-fill");
  darkmodeIcon.css("color", "orange");
}