var express = require('express');
// var cors=require('cors');

// const path = require('path');
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Define route for home.html
// app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'home.html'));
// });

var app = express();
const port = process.env.PORT || 8000
app.use(express.static(__dirname + '/public'));

app.listen(port,function() {
  // console.log("server starting on " + 8000);
});