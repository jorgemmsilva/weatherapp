
function fahrenheitToCelcius (n){
	return ((n-32)/1.8).toFixed(0);
}

(function(){

	// ANGULAR MODULE DEFINITION
	var app = angular.module('weather',[]);

	app.controller('WeatherController',['$scope','$timeout', function( $scope , $timeout ){

		var inputDelay = 500;
		$scope.temperature_unit = 'F'

		$scope.convertTemperature = function (temp){
			if( $scope.temperature_unit == 'C'){
				return fahrenheitToCelcius(temp);
			} else {
				return temp;
			}
		}

		//parses the response from Yahoo API
		var parseWeather = function( httpResponse ){

			var weatherData = JSON.parse(httpResponse)

			if(weatherData.query.results != null){
				$scope.weatherItem = weatherData.query.results.channel.item;
				$scope.message = '';
				$scope.forecast = $scope.weatherItem.forecast;
			}
			else{
				$scope.message = 'Coudn\'t find weather conditions for ' + $scope.location;
			}

			$scope.$apply();

		}

		function getWeather(location){
			if(location.length > 0){

				$scope.forecast = [];
				$scope.weatherItem = false;
				$scope.location = location;

				var queryUrl = buildRequest(location);
				$scope.message = 'Fetching results';
				httpGetAsync(queryUrl,parseWeather);
			} else {
				$scope.message = '';
			}
		}



		//handle keyup event and trigger request when input stops for 500ms (inputDelay)
		var timer;
		this.locationInput = function(event){

			// Stop the pending timeout
			$timeout.cancel(timer);

			// Start a timeout
			timer = $timeout(function() 
			{
				//init http request for Yahoo API
				getWeather(event.target.value);
			},inputDelay);

		};

	}]);

	app.directive('successMessage',function(){
			return {
	      template: '<b> {{weatherItem.title}} </b> <span class="smalltext"> lat.  {{weatherItem.lat}} , long.  {{weatherItem.long}} </span>',
				restrict: 'E'
	    }
	});

})();