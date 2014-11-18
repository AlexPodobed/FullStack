var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var jwt = require('jwt-simple');
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

  var  newUser = new User({
    email: user.email,
    password: user.password
  });

  newUser.save(function(err){
    createToken(newUser, req, res);
  });

});

// Login api
app.post('/login', function(req, res){
  req.user = req.body;

  var searchUser = {email: req.user.email};

  User.findOne(searchUser, function(err, user){
      if(err) throw err;

      if(!user)
        return res.status(401).send({message: "Wrong email/password"});

      user.comparePasswords(req.user.password, function(err, isMatch){
        console.log(err, isMatch)
        if(err) throw err;

        if(!isMatch)
          return res.status(401).send({message: "Wrong email/password"});

        createToken(user, req, res);

      })
  });
});

function createToken(user,req, res) {
  var payload = {
    iss: req.hostname,
    sub: user.id
  };
  var token = jwt.encode(payload, "shh..");

  res.status(200)
    .send({
      user: user.toJSON(),
      token: token
    });
}

var jobs = [
  'Cook',
  'Super Hero',
  'Unicorn Wisperer',
  'Toast Inspector'
];

app.get('/jobs', function(req, res){
  var token, payload;

  if(!req.headers.authorization){
    return res.status(401).send({
      message: "You are not authorized"
    });
  }

  token = req.headers.authorization.split(' ')[1];
  payload = jwt.decode(token, 'shh..');

  if(!payload.sub){
    res.status(401).send({
      message: "Authenification failed"
    });
  }


  res.json(jobs);
});

mongoose.connect("mongodb://alex.podobed:podobed123@ds051640.mongolab.com:51640/podobed_db");



app.listen(3333, function(){
  console.log('listening on port 9000')
});
