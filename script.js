/* github username: @vikramv20 */

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



// cookie functions
function setCookie(key, value) {
    document.cookie = key + "=" + value + ";" + "Path=/;";
}


function getCookie(key) {
    var cookiedict = new Map();
    for(var ck of document.cookie.split(";"))
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
    if(input.value)
    {
        let iconclass = icon.classList;
        if(iconclass.contains("bi-search"))
        {
            url = g_url;
            document.cookie = "icon=bi-search";
        }
        else if(iconclass.contains("bi-youtube"))
        {
            url = y_url;
            document.cookie = "icon=bi-youtube";
        }
        else if(iconclass.contains("bi-instagram"))
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

    if(iconlist.contains("bi-search"))
    {
        icon.classList.replace("bi-search", "bi-google");
        url = g_url;
        input.placeholder = "Search on Google";
    }
    else if(iconlist.contains("bi-google"))
    {
    
        icon.classList.replace("bi-google", "bi-youtube");
        url = y_url;
        input.placeholder = "Search on Youtube";
    }
    else if(iconlist.contains("bi-youtube"))
    {
        icon.classList.replace("bi-youtube", "bi-instagram");
        url = i_url;
        input.placeholder = "Search on Instagram";
    }
    else if(iconlist.contains("bi-instagram"))
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
        
        for(i=1; i<20; i++)
        {
            
            // avoid displaying null values
            if(data.results[i] === null|| data.results[i] === undefined)
                continue;
                
            if(data.results[i].image_url === null)
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


