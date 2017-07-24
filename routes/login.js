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


function checkTempCart(sid,id) {
    console.log("function called!");
    pool.getConnection(function (err, conn) {
        var query = "select*from tempcart where id='" +sid+"'";
        conn.query(query, function (err, rows, fields) {
            if(rows.length>0)
            {
                for(var i=0;i<rows.length;i++)
                {
                    query = "insert into cart(id,pid,quantity) values("+id+","+rows[i].pid+","+rows[i].quantity+")";
                    conn.query(query,function(err1,rows1){
                        if(rows1.insertId)
                        {
                            console.log("OK");
                        }
                    });
                }
            query="delete from tempcart where id='"+sid+"'";
                conn.query(query,function(err1,rows1){
                        if(!err1)
                        {
                            console.log("delOK");
                        }
                    });
            }
        });
    });
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
                 checkTempCart(req.session.id,req.session.user.id);
                 
                 if(!req.session.redirectFlag)
                 {
                     req.session.redirectFlag="/";
                 }
                 res.status(200).send(req.session.redirectFlag);
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