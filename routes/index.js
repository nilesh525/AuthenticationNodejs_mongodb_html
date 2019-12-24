var express = require('express');
var router = express.Router();
var http = require('http').Server(express);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/loginproj';
var flash = require('connect-flash')
var bcrypt = require('bcryptjs');
var user = require('../model/user')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'index' });
});

router.get('/register.html', function(req, res, next) {
  res.render('register.html', { title: 'register' });
});

router.get('/loginpage.html', function(req, res, next) {
  res.render('loginpage.html', { title: 'loginpage' });
});

router.post('/login', function(req, res, next) {
  var lastname = req.body.lastname;
  var pass = req.body.pass;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("loginproj");
    console.log('user name '+lastname);
    var query = { lastname: lastname};
    dbo.collection("users").findOne(query,function(err, result) {
      if (err) {
        res.render('error.html', { title: 'loginpage' });
      }
      console.log('user list '+result.gender+' '+result.pass);
      if(result.pass==pass){
        req.flash('title', result.firstname);
        var dateObj = new Date(result.date);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        newdate = year + "/" + month + "/" + day;
        console.log(newdate);
        res.render('successlogin.html', { title: result ,date:newdate});
      }else{
        res.render('error.html', { title: 'loginpage' });
      }
      db.close();
    });
  });
});

router.post('/register', function(req, res, next) {
  var name=req.body.firstname;
  var lastname = req.body.lastname;
  var gender = req.body.gender;
  var date = req.body.date;
  var address = req.body.address;
  var city = req.body.city;
  var country = req.body.country;
  var dept = req.body.dept;
  var desc = req.body.desc;
  var pass = req.body.pass;
  var cpass = req.body.cpass;
  console.log(name+'address---------------->'+address);
  if(pass==cpass){
    var newUser = new user({
      firstname:name,
      lastname:lastname,
      gender:gender,
      date:date,
      address:address,
      city:city,
      country:country,
      dept:dept,
      desc:desc,
      pass:pass
    });

    user.createUser(newUser,function(err,user){
      if(err) throw err;
      console.log(user);
    })
    res.render('successRegister.html', { title: 'index' });
  }else{
    res.render('error.html', { title: 'index' });
  }
 
});

module.exports = router;
