var express = require('express');
var router = express.Router();

function checkSignIn(req, res, next) {
    if (req.session.user) {
    next();    
    }
    else {    
    res.redirect('/');
    }
}

router.get('/',checkSignIn,function(req,res){
     var sid=req.session.id;
//var uid=req.session.user.id;    
    console.log(sid);
    req.session.destroy(function(){
      console.log("user with Sid "+sid+" logged out.");
 res.status(200).send("You were successfully logged Out!");
    });
});
    
module.exports = router;