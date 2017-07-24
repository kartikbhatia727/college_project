//cart = [];
var express = require('express');
var router = express.Router();
//var requestify = require('requestify');
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost'
    , user: 'root'
    , password: ''
    , database: 'ecom'
});

function checkSignIn(req, res, next) {
    if (req.session.user) {
    next();    
    }
    else {    
    req.session.redirectFlag='/account';
        res.redirect('/login');
    }
}

router.get('/',checkSignIn ,function (req, res) {
    //result=[];
    if (req.session.user) {
        pool.getConnection(function (err, conn) {
            var query="select name,email,mobile from user where id="+req.session.user.id;
            conn.query(query, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                }
                else
                {
                 //console.log(rows);
                var a=[];
                    for(var i=0;i<rows.length;i++){
                     a.push(i);
                }
                console.log(a);
                    res.render('account',{result:rows,arr:a});  
                }
            });
        conn.release();
        });
    
        //console.log(result);        
    }
});
module.exports = router;