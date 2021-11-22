var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const body = req.body;
  //console.log(body.hasOwnProperty("username"));
  if (body.hasOwnProperty('username')) {
    res.send(body);
  } else {
    const err = new Error('Request has no username');
    //err.status = 500;
    next(err)
  }

});


// LOGIN
router.post('/login', (req, res, next) => {

  //to read the environment variables from .env file
      //1. add require('dotenv').config(); to the top of the file
      //2. use process.env.VARIABLENAME

  console.log(process.env.USERNAME, process.env.PASSWORD);
  if (req.body.username == process.env.USERNAME && req.body.pass == process.env.PASSWORD) {
    res.send('you logged in successfully.')
  } else {
    const err = new Error('Username or password are not matched');
    next(err);
  }
})


module.exports=router