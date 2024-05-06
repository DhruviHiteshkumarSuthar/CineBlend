var express = require('express');

var app = express();
const port = process.env.PORT || 8080
app.use(express.static(__dirname + '/public'));

app.listen(port,function() {
  // console.log("server starting on " + 8000);
});