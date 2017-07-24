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
  console.log("I'm Called!");
    if (req.session.user) {
        next();
    }
    else {
        req.session.redirectFlag='/cart';
        res.status(200).send("b");
    }
}
router.get('/',checkSignIn,function (req, res) {
    if (req.session.user) {
        pool.getConnection(function (err, conn) {
            var q = "select t1.cid,t1.pid,t1.quantity,product.category,product.brand,product.description,product.price,product.image from cart t1,product where t1.pid=product.pid and t1.id=" + req.session.user.id;
            conn.query(q, function (err, rows, fields) {
                if (err) {
                    console.log("err\n" + err);
                }
                else {
                    var query = "delete from cart where id=" + req.session.user.id;
                    conn.query(query, function (err1, rows1, fields1) {
                        if (!err1) {
                            for (var i = 0; i < rows.length; i++) {
                                query = "insert into orders(id,pid,quantity,date) values(" + req.session.user.id + "," + rows[i].pid + "," + rows[i].quantity + ",CURDATE())";
                                conn.query(query, function (err2) {
                                    if (err2) {
                                        console.log("err2");
                                        console.log(err2);
                                        res.status(500);
                                    }
                                    else {
                                        res.status(200).send("Success");
                                    }
                                });
                            }
                        }
                        else {
                            console.log("err1\n" + err1);
                            //res.status(500);
                        }
                    });
                }
            });
            conn.release();
        });
    }
    
});
module.exports = router;