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

    new User(user).save(function (err,user) {
        if(err){
            res.statusCode(500).send(err);

        }else{
            res.send(user);
        }
        console.log(user);
    });
});

router.post('/login', function (req,res) {
    var user = req.body;
    
    User.findOne({username:user.username,password:md5(user.password)}, function (err,doc) {
        if(err){
            res.statusCode(500).send(err)
        }else{
            res.send(doc);
            req.session.user=doc;
        }
        console.log(doc);
    })
});

router.post('/logout', function (req,res) {
    req.session.user = null;
    res.statusCode(500).send('退出成功');
});

module.exports = router;



