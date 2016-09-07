var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shop');
var bodyParser = require('body-parser');

//设置路由
var user = require('./routes/user');

//使用静态文件服务器中间件
app.use(express.static(path.join(__dirname,'app','public')));
app.use(bodyParser.json());          //解析请求 content-type  application/json
app.use(bodyParser.urlencoded({extended:false}));


app.use('/user',user);



app.listen(8080);