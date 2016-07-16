var express = require('express');

var app = express();

app.set('port',process.env.PORT || 3000);

app.get('/', function(req,res){

  res.sendFile('views/index.html');


});

app.listen( app.get('port') , function(){
  console.log('Express server running Ctrl-C to terminate');
});



// (function () {
//   'use strict';

//   var env = require('jsdom').env
//     , html = '<html><body><h1>Hello World!</h1><p class="hello">Heya Big World!</body></html>'
//     ;

//   // first argument can be html string, filename, or url
//   env(html, function (errors, window) {
//     console.log(errors);

//     var $ = require('jquery')(window)
//       ;

//     console.log($('.hello').text());
//   });
// }());