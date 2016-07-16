var query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"%s\")";

var url = "https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=";

function buildRequest(text) {

    return url + query.replace("%s", text);

}

function httpGetAsync(url, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        else{
          if(xmlHttp.status != 200 && xmlHttp.status != 0 ){
            console.log("error - http_status:" + xmlHttp.status);
          }
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 

    xmlHttp.send(null);
}


exports.buildRequest = buildRequest;
exports.httpGetAsync = httpGetAsync;