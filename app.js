var express = require('express');

var app =module.exports= express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var signup=require('./routes/signup');
var login=require('./routes/login');
var verify=require('./routes/verify');
var logout=require('./routes/logout');
var cart=require('./routes/cart');
var checkout=require('./routes/checkout');
var orders=require('./routes/orders');
var account=require('./routes/account');

var mysql=require('mysql');
var session = require('express-session');
var mysqltorest=require('mysql-to-rest');

app.use(session({ secret: 'keyboard cat'}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var con = mysql.createConnection({
        host: 'localhost'
        , user: 'root'
        , password: ''
        , database: 'ecom'
    });
    
var api=mysqltorest(app,con);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/signup',signup);
app.use('/login',login);
app.use('/verify',verify);
app.use('/logout',logout);
app.use('/cart',cart);
app.use('/checkout',checkout);
app.use('/orders',orders);
app.use('/account',account);
//app.use('/test1',index);


app.get('/test1',function(req,res){
    res.render('abc');
});
app.get('/mobile',function(req,res){
    res.render('mobile');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports=app.a;
module.exports = app;