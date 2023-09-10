/* github username: @vikramv20 */

var newsdata = "hi";
var g_url = "https:/\/google.com/search?q=";
var y_url = "https:/\/youtube.com/results?search_query=";
var i_url = "https:/\/instagram.com/";

var url = g_url;

var cookie = document.cookie;


var body = document.getElementById("body");
var icon = document.getElementById("search-icon");
var input = document.getElementById("search");

var cookiedict = new Map();
for(var ck of cookie.split(";"))
{
    let cks = ck.trim().split('=');
    cookiedict.set(cks[0], cks[1]);
}

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

$.getJSON('https:/\/newsapi.org/v2/top-headlines?country=us&apiKey=ce19cf45f5434a47862c18bccd256bfc', 
    function(data) {
        
        newscontain = document.getElementById("news-container");
        
        for(i=1; i<10; i++)
        {
            
            // avoid displaying null values
            if(data.articles[i].urlToImage === null)
                continue;


            var news = document.createElement("div");
            var newsimg = document.createElement("img");
            var newstitle = document.createElement("p");
            var newslink = document.createElement("a");
            
        
            news.className = "news";
            newsimg.className = "news-img";
            newstitle.className = "news-title";
            newslink.className = "news-link";
            
            
            newsimg.src = data.articles[i].urlToImage;
            
            newstitle.innerText = data.articles[i].title;
            
            newslink.href = data.articles[i].url;
            
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
