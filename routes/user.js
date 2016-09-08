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
            res.status(500).json({msg:'注册失败'});
        }else{
            res.send(user);
        }
    });
});

router.post('/login', function (req,res) {
    var user = req.body;
    
    User.findOne({username:user.username,password:md5(user.password)}, function (err,doc) {
        if(err){
            res.status(500).json({msg:'登录失败'});
        }else{
            req.session.user=doc;
            res.send(doc);
        }

    })
});

router.post('/logout', function (req,res) {
    req.session.user = null;
    res.status(200).json({msg:'退出成功'});
});

router.post('/validate', function (req,res) {
    var user = req.session.user;

    if(user && user._id){
        res.status(200).json({msg:'成功'});
    }else{
        res.status(401).json({msg:'用户未登录'});
    }
});

module.exports = router;



