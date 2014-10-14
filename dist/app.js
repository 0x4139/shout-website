var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname))
app.engine('html', require('ejs').renderFile);

app.set('views', __dirname); // specify the views directory

app.get('*',function(req,res){
	res.render('index.html');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});