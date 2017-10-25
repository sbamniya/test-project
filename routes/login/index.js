const pool = require('./../../db.js');
const dbConfig = require('mysql-operations'); 
const crypto = require('crypto');
const randomstring = require("randomstring");;

var loginUser = (req, res) => {
    var email = req.query.email;
    var password = req.query.password;
    if(!email || !password){
        res.status(200).json({isSuccess: false, message: 'Parameter missing !'});
        return;
    }
    dbConfig.getRow(pool, 'user_master', {email: email}, '*', function(err, data){
        if(err){
            console.log(err);
            res.status(200).json({isSuccess: false, message: 'Unexpected error occure please try again after some time !'});
            return;
        }
        if(!data.email || !data.password || !data.userStatus) {
            res.status(200).json({isSuccess: false, message: 'User not registered !'});
            return;
        }
        if(!data.userStatus){
            res.status(200).json({isSuccess: false, message: 'User is disabled !'});
            return;
        }
        const hash = crypto.createHash('md5').update(password).digest('hex');
        if(data.password != hash){
            res.status(200).json({isSuccess: false, message: 'Email and password didn\'t match !'});
            return;
        }
        req.session.userDetails = {
            userId: data.userId,
            name: data.name,
            email: data.email,
            userStatus: data.userStatus
        };
        global.userData = req.session.userDetails;
        res.status(200).json({isSuccess: true, message: 'Logged in successfull !'});
        return;
    });
};

var checkLoginStatus = (req, res) => {
    if(global.userData && global.userData.userId){
        res.status(200).json({isSuccess: true, message: 'User logged in !', userData: global.userData});
        return;
    }
    res.status(401).json({isSuccess: false, message: 'User not logged in !'});
    return;
}
var logout = (req, res) => {
    global.userData ={};
    res.status(200).json({isSuccess: true, message: 'Logged out succefully !'});
    return;
}
var sendForgetLink = (req, res) => {
    var email = req.body.email;
    dbConfig.getRow(pool, 'user_master', {email: email}, '*', function(err, data){
        if(err){
            console.log(err);
            res.status(200).json({isSuccess: false, message: 'Unexpected error occure please try again after some time !'});
            return;
        }
        if(!data.email || !data.password || !data.userStatus) {
            res.status(200).json({isSuccess: false, message: 'User not found !'});
            return;
        }
        if(!data.userStatus){
            res.status(200).json({isSuccess: false, message: 'User is disabled !'});
            return;
        }
        var randomString = randomstring.generate();
        global.transporter.sendMail({
            from: 'sonu.chapter247@gmail.com',
            to: email,
            subject: 'Reset Password',
            html: 'Hey ' + data.name + '!<br/><br/> Click the following link to reset password. <br><br><a href="http://localhost:4200/reset-password/'+ randomString +'/'+data.userId+'">click here to reset password </a><br><br>Thank You !'
        }, function(error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log(response);
                console.log('Message sent');
            }
        });
        dbConfig.updateData(pool, 'user_master', {email: email}, {resetToken: randomString}, function(err, response) {});
        res.status(200).json({isSuccess: true, message: 'Email sent successfully !'});
        return;
    });
}

var verfiyLink = (req, res)=>{
    var body = req.body;
    var userId = body.userId;
    var resetToken = body.resetToken;
    if(!userId || !resetToken){
        res.status(200).json({isSuccess: false, message: 'Parameter missing !'});
        return;
    }
    dbConfig.getRow(pool, 'user_master', body, 'userId', function(err, data){
        if(err){
            console.log(err);
            res.status(200).json({isSuccess: false, message: 'Unexpected error occure please try again after some time !'});
            return;
        }
        if(!data.userId){
            res.status(200).json({isSuccess: false, message: 'Invalid link !'});
            return;
        }
        
        res.status(200).json({isSuccess: true, message: 'Link verfied successfully !'});
        return;
    });
}
var savePassword = (req, res) =>{
    var body = req.body;
    var userId = body.userId,
        resetToken = body.resetToken,
        password = body.password;
    dbConfig.getRow(pool, 'user_master', {userId: userId, resetToken: resetToken}, 'userId', function(err, data){
        if(err){
            console.log(err);
            res.status(200).json({isSuccess: false, message: 'Unexpected error occure please try again after some time !'});
            return;
        }
        if(!data.userId){
            res.status(200).json({isSuccess: false, message: 'Invalid link !'});
            return;
        }
        const hash = crypto.createHash('md5').update(password).digest('hex');
        dbConfig.updateData(pool, 'user_master', {userId: userId, resetToken: resetToken}, {resetToken: '', password: hash}, function(err, response) {
            if(err){
                console.log(err);
                res.status(200).json({isSuccess: false, message: 'Unexpected error occure please try again after some time !'});
                return;
            }
            res.status(200).json({isSuccess: true, message: 'Password Updated successfully !'});
            return;
        });
        
    });
}
var loginModule = {
    login: loginUser,
    checkLoginStatus: checkLoginStatus,
    logout: logout,
    sendForgetLink: sendForgetLink,
    verfiyLink: verfiyLink,
    savePassword: savePassword
}

module.exports = loginModule;