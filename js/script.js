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
    $('#message_div').text("Fetching results");
  	$('#results_div').hide();

    xmlHttp.send(null);
}

function fahrenheitToCelcius (n){
	return ((n-32)/1.8).toFixed(0);
}

//populate html with results
function displayWeather(forecastArray){

	//get only the first 5 days
	if(forecastArray != undefined ){
		forecastArray = forecastArray.slice(0,5);
		window.currentForecast = forecastArray;
	}
	else{
		forecastArray = window.currentForecast;
	}

	$.each(forecastArray,function(index,obj){
		var dayForecastHtml = '<div class="date">' + obj.day + ',' + obj.date +
												 	'</div><div class="weather_text">'+ obj.text +
												 	'</div>';

		if( $('#convert_to_celcius_checkbox').prop('checked') ){
 			dayForecastHtml +=  '<div class="temphigh"> Max:' + fahrenheitToCelcius(obj.high) + 'C' + 
												 	'</div><div class="templow"> Min: ' + fahrenheitToCelcius(obj.low) + 'C' + 
												 	'</div>';
		} else {
			dayForecastHtml +=  '<div class="temphigh"> Max: ' + obj.high + 'F' + 
												 	'</div><div class="templow"> Min: ' + obj.low + 'F' + 
												 	'</div>';	
		}

		var htmlDayObj = $('.day[data-day='+index+']').html(dayForecastHtml)

	});
}


//parses the http request from Yahoo API
var parseWeather = function( httpResponse ){

	weatherData = JSON.parse(httpResponse)

	if(weatherData.query.results != null){
		var weatherItem = weatherData.query.results.channel.item
		$('#message_div').html('<b>' + weatherItem.title + '</b> <span class="smalltext"> lat. ' + weatherItem.lat + ', long. ' + weatherItem.long + '</span>' );

		displayWeather(weatherItem.forecast);

		$('#results_div').show();

	}
	else{
		$('#message_div').text("Coudn't find weather conditions for " + $('#location_input').val());
		$('#results_div').hide();
	}

}

//init http request for Yahoo API
function getWeather()
{
	var location = $('#location_input').val();
	var queryUrl = buildRequest(location)
	httpGetAsync(queryUrl,parseWeather)
}


$(function(){

	var timer;
	//trigger request when input stops for 500ms
	$('#location_input').on('keyup',function(){
		clearTimeout(timer);
		timer = setTimeout(getWeather,500);
	});

	$('#convert_to_celcius_checkbox').change(function(){displayWeather();});

	$('#results_div').hide();
});