var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var jwt = require('./services/jwt.js');

var app = express();
app.use(bodyParser());
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.post('/register', function(req, res){

  var user = req.body;

  console.log(user);
  var  newUser = new User.model({
    email: user.email,
    password: user.password
  });
  console.log(req.hostname);
  var payload = {
    iss: req.hostname,
    sub: user._id
  };
  var token = jwt.encode(payload, "shh..");

  newUser.save(function(err){
    res.status(200)
      .send({
        user: newUser.toJSON(),
        token: token
      });
  });

});

mongoose.connect("mongodb://alex.podobed:podobed123@ds051640.mongolab.com:51640/podobed_db");



app.listen(3333, function(){
  console.log('listening on port 9000')
});
