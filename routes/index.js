var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 if(req.session.user)
    res.render('test',{user:req.session.user});
else
    res.render('test',{user:{
        id: "Guest",
        name: "Guest"
    }});
    // res.render('index', { title: 'Express' });
});

/*router.get('/test',function(req,res,next){
    res.render('test');
});
*/
/*router.get('/signup',function(req,res,next){
    res.render('signup')
});
*/


router.get('/search',function(req,res){
    res.render('sresult');
});

router.get('/products',function(req,res){
    if(req.session.user)
    res.render('products',{user:req.session.user,sid: req.session.id,});
else
    res.render('products',{user:{
        id: "Guest",
        name: "Guest"
    },sid: req.session.id});
    //res.render('products');
});

module.exports = router;