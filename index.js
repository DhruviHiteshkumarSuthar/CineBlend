var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var PORT;
var Cloudant = require('@cloudant/cloudant');

if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}

var url = "https://apikey-v2-182sso54wjwbhfsn4vutlvd52tohwxm5tr5neu0vzjf8:ef898583465dfc2b6ae676f89dbe74ca@fda58982-1434-460f-8929-dfc3615c3c07-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-182sso54wjwbhfsn4vutlvd52tohwxm5tr5neu0vzjf8";
var password = "ef898583465dfc2b6ae676f89dbe74ca";


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.post('/signup', (req, res) => {
  const {name, email, upassword} = req.body;
  const name1=req.body.name;
  const name2=req.body['name'];
  console.log(name1, name2);
  console.log('Received data:', name, email, upassword);

  const cloudant = Cloudant({ url: url, username: username, password: password });

  // Access or create the 'users' database
  const usersDB = cloudant.use('users');
  
  // Check if the email already exists
  usersDB.get(email, (err) => {
    if (!err) {
      // Email already exists
      res.status(400).send('Email already exists');
    } else {
      // Email does not exist, create new user
      usersDB.insert({ _id:email, name: name, upassword: upassword }, (err) => {
        if (err) {
          res.status(500).send('Error creating user');
        } else {
          res.status(200).send('User created successfully');
        }
      });
    }
  });
});

app.post('/signin', (req, res) => {
  const { email, upassword } = req.body;
  console.log(email,upassword);
  // Initialize Cloudant
  const cloudant = Cloudant({ url: url, username: username, password: password });

  // Access the 'users' database
  const usersDB = cloudant.use('users');

  // Get user details by email
  usersDB.get(email, (err, body) => {
    if (err) {
      res.status(400).send('Invalid email or password');
    } else {
      // Check if passwords match
      if (body.upassword === upassword) {
        res.status(200).send('Sign in successful');
      } else {
        res.status(400).send('Invalid email or password');
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
