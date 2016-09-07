var express = require('express');
var User = require('../models').User;
var router = express.Router();


function md5(str){
    return require('crypto').createHash('md5').update(str).digest('hex');
}

router.post('/reg', function (req,res) {
    var user = req.body;
    user.password = md5(user.password);
    user.email = md5(user.email);
    user.avatar = 'http://s.gravatar.com/avatar/'+user.email+'?s=28';


});





