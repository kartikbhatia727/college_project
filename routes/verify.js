var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost'
    , user: 'root'
    , password: ''
    , database: 'ecom'
});
router.get('/', function (req, res) {
            var token = req.query.token;
            if (token.length > 0) {
                //console.log(req.query.token);    
                pool.getConnection(function (err, conn) {
                    var query = "select email from verification where token='" + token + "'";
                    conn.query(query, function (err1, rows1) {
                        if (err1) {
                            res.status(400);
                        }
                        else {
                            var query1 = "update verification set verify='TRUE' where email='" + rows1[0].email + "'";
                            conn.query(query1, function (err2) {
                                if (err1) {
                                    res.status(500).send("SORRY,We encountered an internal server error!");
                                }
                                else {
                                    res.status(200).send("VERIFIED!");
                                }
                            });
                        }
                    });
                    //res.status(200).send("A");
                });
            }
            else {
                res.status(404).send("NOT FOUND");
            }
        });
        module.exports = router;