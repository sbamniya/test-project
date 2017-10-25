const pool = require('./../../db.js');
const dbConfig = require('mysql-operations'); 

var getOverview = (req, res) => {
    var sql = 'SELECT ov.overviewName, DATE_FORMAT(ov.startingDate, "%d %b, %Y") as startingDate, ov.overviewId, DATE_FORMAT(ov.dueDate, "%d %b, %Y") as dueDate, DATE_FORMAT(ov.createdAt, "%d %b, %Y %h:%i %p") as createdAt, (case when ov.status=1 then "Started" else "Idle" end) as status, um.name as createdBy from overview_master ov INNER JOIN user_master um on um.userId = ov.createdBy';
    dbConfig.queryWithResult(pool, sql, function(err, data){
        if(err){
            res.status(200).json({isSuccess: false, message: 'An Unexpected error occure !'});
            return;
        }
        res.status(200).json({isSuccess: true, message: 'Data fetched successfully !', data: data});
        return;
    });
}

var setOverviewTasks = (req, res) =>{
    if(!global.userData || !global.userData.userId){
        res.status(200).json({isSuccess: false, message: 'Please login first !'});
        return;
    }
    var body = req.body;
    var description = body.description;
    var overViewId = body.overViewId;
    var priority = body.priority;
    var randomNumber = body.randomNumber;
    var responsibleUser = body.responsibleUser;
    var tag = body.tag;
    var taskDueDate = body.taskDueDate;
    var taskName = body.taskName;
    var createdBy = global.userData.userId;

    var dataToSave = {
        overviewId: overViewId,
        taskName: taskName,
        tags: tag,
        description: description,
        responsibleUser: parseInt(responsibleUser),
        taskDueDate: taskDueDate,
        priority: priority,
        relatedMeta: randomNumber,
        createdBy: createdBy
    }
    dbConfig.insertData(pool, 'overview_tasks', dataToSave, function(err, data){
        if(err){
            res.status(200).json({isSuccess: false, message: 'An Unexpected error occure !'});
            return;
        }
        res.status(200).json({isSuccess: true, message: 'Data inserted successfully !', data: data});
        return;
    });
}
var getTasks = (req, res)=>{
    var id = req.query.overview;
    var sql = 'SELECT ot.taskId, ot.overviewId, ot.taskName, ot.tags, ot.description, DATE_FORMAT(ot.taskDueDate, "%d %b, %Y") as taskDueDate, ot.priority, um.name as responsibleUser from overview_tasks ot INNER JOIN overview_master om on om.overviewId = ot.overviewId INNER JOIN user_master um on um.userId = ot.responsibleUser where ot.overviewId='+id;
    dbConfig.queryWithResult(pool, sql, function(err, data){
        if(err){
            res.status(200).json({isSuccess: false, message: 'An Unexpected error occure !'});
            return;
        }
        res.status(200).json({isSuccess: true, message: 'Data fetched successfully !', data: data});
        return;
    });
}

var overviewModule = {
    getOverview: getOverview,
    setOverviewTasks: setOverviewTasks,
    getTasks: getTasks
}

module.exports = overviewModule;