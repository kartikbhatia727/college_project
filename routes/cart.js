cart = [];
var express = require('express');
var router = express.Router();
var requestify = require('requestify');
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
    res.redirect('/login');
    }
}

router.get('/',checkSignIn,function (req, res) {
    //result=[];
    if (req.session.user) {
        pool.getConnection(function (err, conn) {
        //    var query = "SELECT pid, COUNT(*) as quantity FROM cart where id=" + req.session.user.id + " GROUP BY pid";
            console.log(req.session.user.id);
            var q = "select t1.cid,t1.pid,t1.quantity,t1.id,product.category,product.brand,product.description,product.price,product.image from cart t1,product where t1.pid=product.pid and t1.id="+req.session.user.id;
            
            conn.query(q, function (err, rows, fields) {
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
                    res.render('cart',{result:rows,arr:a});  
                }
            });
        conn.release();
        });
    
        //console.log(result);        
    }
});
/*router.post('/addItem', function (req, res) {
    req.session.cart = [];
    cart.push({
        id: req.body.id
        , pid: req.body.pid
        , quantity: 1
    });
    //cart.push(cart_det);
    req.session.cart = cart;
    res.status(200).send("Success!");
});
pid:rows.pid,
                                    quantity:rows.quantity,
                                    category:rows.category,
                                    brand:rows.brand,
                                    product:rows.
                                   
*/
module.exports = router;