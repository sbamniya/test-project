const pool = require('./../../db.js');
const dbConfig = require('mysql-operations'); 

var activeUsers = (req, res) => {
    dbConfig.getAll(pool, 'user_master', {userStatus: 1},'userId, name', '','','','', function(err, data){
        if(err){
            res.status(200).json({isSuccess: false, message: 'An Unexpected error occure !'});
            return;
        }
        res.status(200).json({isSuccess: true, message: 'Data fetched successfully !', data: data});
        return;
    });
}

var userModule = {
    geActiveUsers: activeUsers
}

module.exports = userModule;