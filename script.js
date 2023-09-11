/* github username: @vikramv20 */

var g_url = "https:/\/google.com/search?q=";
var y_url = "https:/\/youtube.com/results?search_query=";
var i_url = "https:/\/instagram.com/";

var url = g_url;

var body = document.getElementById("body");
var icon = document.getElementById("search-icon");
var input = document.getElementById("search");



// cookie functions

function setCookie(key, value) {
    document.cookie = key + "=" + value;
    
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


// end of cookie functions

var oldcounter = getCookie("counter");

if(isNaN(oldcounter))
    setCookie("counter", 1);
else
    setCookie("counter", Number(oldcounter) + 1);
    
var counter = document.querySelector(".counter");

counter.innerText = "Your visited this site " + getCookie("counter") + " times";


/* console.log(icon.classList.replace("bi-search", cookie));*/

/* pressed the enter key */
document.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        open_url();
    }
});

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
        switch_icon();        
    }
    else 
        console.log(input.value);
}


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


function switch_icon() {  
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


// don't use my news api key :)
// get your own api at `newsapi.org`
// by registering there.

$.getJSON("https:/\/newsdata.io/api/1/news?apikey=pub_29106f05acffd4eecaca1c36a1cb0df485ce7&country=in&language=en&q=web%20series", 
    function(data) {
        
        newscontain = document.getElementById("news-container");
        
        for(i=1; i<20; i++)
        {
            
            // avoid displaying null values
            if(data.results[i].image_url === null)
                continue;

            console.log(data.results[i].image_url)

            var news = document.createElement("div");
            var newsimg = document.createElement("img");
            var newstitle = document.createElement("p");
            var newslink = document.createElement("a");
            
        
            news.className = "news";
            newsimg.className = "news-img";
            newstitle.className = "news-title";
            newslink.className = "news-link";
            
            
            newsimg.src = data.results[i].image_url;
            
            newstitle.innerText = data.results[i].title;
            
            newslink.href = data.results[i].link;
            
            news.appendChild(newsimg);
            news.appendChild(newstitle);
            
            newslink.appendChild(news);
            
            newscontain.appendChild(newslink);
         }
    }
);


function open_setting() {
    var setting = document.getElementById("setting");
    
    alert("Not Implemented Yet.");
}



