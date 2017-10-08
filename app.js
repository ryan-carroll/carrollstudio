var express = require('express');
var https = require('https');
var app = express();
var fs = require('fs');

var secureserver = https.createServer(sslOptions, app);
var sslOptions = {
 // key: fs.readFileSync('key.pem'),
 // cert: fs.readFileSync('cert.pem')
};

secureserver.listen(process.env.PORT);

secureserver.on('listening', function() {
  var port = secureserver.address().port;
  console.log('Secure app listening on port ' + port + '!');
});

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    // pug render automatically looks in the views folder
	res.render('index');
	console.log("app.get has attempted to render the index file");
});

// error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message, 
            error: err
        });
     });
 }