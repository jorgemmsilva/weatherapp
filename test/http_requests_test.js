var httpReq = require('../assets/js/weather_http_request.js')

var query = ""

exports.testQueryGeneration = function(test) {

  query = httpReq.buildRequest('porto');

  var expected = "https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"porto\")";

  test.ok((query == expected), "testing query generation");
  test.done();
};

// exports.testHttpRequest = function(test) {

//   var callbackFunc = function( httpResponse ){
//       test.ok(true, "http response received");
//       test.done();
//   }
  
//   httpReq.httpGetAsync(query,callbackFunc);

// };