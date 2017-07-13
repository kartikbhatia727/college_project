var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost'
    , user: 'root'
    , password: ''
    , database: 'ecom'
});

function checkSignIn(req, res, next) {
    if (req.session.user) {
        console.log("Already Logged In!\n" + req.session.user.email);
        res.status(200).send("Already Logged in\n User:"+req.session.user.email);
        //res.redirect('/dashboard');
        //If session exists, proceed to page
    }
    else {
        next();
    }
}


router.get('/',function(req,res){
    if(req.session.user)
    res.redirect('/');
        else
        res.render('login');
});

router.post('/', checkSignIn, function (req, res, next) {
    try{
    pool.getConnection(function (err, conn) {
        var query = "Select*from user where (email='" + req.body.login + "'||mobile='" + req.body.login + "') && password='" + req.body.password + "'";
        if (err) {
            console.log("Connection Failed!");
            res.status(500).send("Internal Server Error!");
        }
        else {
            console.log("Connection Made!");
            conn.query(query, function (err1, rows, fields) {
                /*if (err1) {
                    console.log(err1);
                }*/
                if(rows.length>0)
                {req.session.user = {
                        id: rows[0].id
                        , name: rows[0].name
                        , email: rows[0].email
                        , mobile: rows[0].mobile
                    };
                res.status(200).send("Hello!");
                    console.log("User with id "+req.session.user.id+" Logged in!");
                }
                else
                {
                    //console.log(err1);
                res.status(400).send("Bad Request!");
                }
            });
        }
    conn.release();
    });
    }
    catch(error)
    {
        res.status(500).send("Bad Request!");
    }
});
module.exports = router;