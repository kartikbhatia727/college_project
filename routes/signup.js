var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//var app=require('../app')(a);
var nodemailer = require('nodemailer');
var pool = mysql.createPool({
    host: 'localhost'
    , user: 'root'
    , password: ''
    , database: 'ecom'
});
var transporter = nodemailer.createTransport({
    service: 'gmail'
    , auth: {
        user: 'vibhor350a@gmail.com'
        , pass: 'vibhoriscool1'
    }
});
var token = '';

function gentoken(x) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = x; i > 0; --i) {
        token += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    //return 
    return token;
}
token = gentoken(48);

function genlink(y) {
    return y + '/verify/?token=' + token;
}

function checkSignIn(req, res, next) {
    if (req.session.user) {
        console.log("Already Logged In!\n" + req.session.user.email);
        res.status(200).send('/');
        //res.redirect('/dashboard');
        //If session exists, proceed to page
    }
    else {
        next();
    }
}
router.get('/', function (req, res) {
    if (req.session.user)
    //console.log("I'm Here!");
        res.status(200).send('/');
    else res.render('signup');
    //console.log(token);
    //console.log(genlink(req.headers.host));    
    //console.log(genlink(48,req.headers.host));
});
router.post('/', checkSignIn, function (req, res, next) {
    //console.log(req.body.name);    
    //console.log("");    
    var query = "insert into user(name,email,mobile,password) values('" + req.body.name + "','" + req.body.email + "','" + req.body.mob + "','" + req.body.pass + "')";
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Connection Made!");
            conn.query(query, function (err1, rows1) {
                if (err1) {
                    console.log("Error1");
                }
                else {
                    req.session.user = {
                        id: rows1.insertId
                        , name: req.body.name
                        , email: req.body.email
                        , mobile: req.body.mob
                    };
                    console.log("Success");
                    console.log(req.session.user.name);
                    var mailOptions = {
                        from: 'vibhor350a@gmail.com'
                        , to: req.session.user.email
                        , subject: 'Please Verify your Email Address'
                        , text: 'Please click on the link below!'
                        , html: '<a href="' + genlink(req.headers.host) + '">' + genlink(req.headers.host) + '</a>'
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }
            });
            console.log(token);
            console.log(genlink(req.headers.host));
            var query1 = "Insert into verification(email,token) values('" + req.body.email + "','" + token + "')";
            conn.query(query1, function (err2) {
                if (err2) {
                    console.log("error2");
                }
                else {
                    console.log(token);
                    console.log("success!");
                    res.status(200).send('/');
                }
            });
            conn.release();
        }
    });
});
router.get('/', function (req, res) {
    res.redirect('signup.html');
});
module.exports = router;