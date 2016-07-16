var express = require('express');

var app = express();

var public_dir = __dirname + '/public/'

app.set('port',process.env.PORT || 8080);

app.use(express.static(public_dir));

app.get('*', function(req, res) {
  res.sendFile(public_dir + '/index.html');
});

app.listen( app.get('port') , function(){
  console.log('Express server running Ctrl-C to terminate');
});
