var express = require('express')
var engines = require('consolidate');
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname))
app.engine('html', engines.hogan);
app.set('views', __dirname); // specify the views directory

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});