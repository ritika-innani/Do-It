var Task = require('../mongodb/models/task');
var Message = require('../mongodb/models/userMessage');
var jwt = require('jsonwebtoken');

module.exports = function(router){
    
    router.post('/task', function(req,res){
        var today=new Date();
        if(!req.body.project){
            res.json({success:false, message: 'Must provide a project name'});
        } else{
            if(!req.body.task){
                res.json({success:false, message: 'Must provide a task name'});
            } else{ 
                let task = new Task({
                    user_id: req.body._id,
                    project: req.body.project,
                    task: req.body.task,
                    description: req.body.description,
                    created_on: today,
                    due_date: req.body.due_date,
                    assignee: req.body.assignee,
                    priority: req.body.priority,
                    status: req.body.status
                });
                console.log(task);
                task.save(function(err){
                    if(err){
                        console.error(err);
                        res.json({success: false, message: 'could not save task', err})
                    }
                    else{
                        let message = new Message({
                            email: req.body.assignee,
                            message: 'You have been invited to collaborate on the project ' + req.body.project
                        });
                        console.log(message);
                        message.save(function(err){
                            if(err){
                                console.log(err);
                                res.json({success: false, message: 'could not send invite', err});
                            } else{
                                res.json({success: true, message: 'Task saved Successfully'});
                            }
                        })
                    }
                });
            }
        }
    });
    
    router.get('/tasks/:id', function(req,res){
        if(req.params.id){
            Task.find({ user_id: req.params.id }, function(err, tasks) {
              if(err){
                   res.json({success: false, message: err});
               } else{
                   if(!tasks){
                       res.json({success: false, message: 'No tasks found'});
                   } else{
                       res.json({success: true, tasks:tasks});
                   }
               }
            });
            
        }else {
            Task.find({}, function (err, tasks) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    if (!tasks) {
                        res.json({success: false, message: 'No tasks found'});
                    } else {
                        res.json({success: true, tasks: tasks});
                    }
                }
            });
        }
    });
    
    router.get('/task/:id', function(req,res){
        if(req.params.id){
            Task.find({ _id: req.params.id }, function(err, task) {
              if(err){
                   res.json({success: false, message: err});
               } else{
                   if(task.length == 0){
                       res.json({success: false, message: 'No task found'});
                   } else{
                       console.log(task);
                       res.json({success: true, task:task});
                   }
               }
            });
        }
    });
    
    router.delete('/task/:id', function(req,res){
        if(!req.params.id){
            res.json({success: false, message: 'No id provided'});
        } else{
            Task.findOne({_id: req.params.id }, function(err, task){
                if(err){
                    res.json({success: false, message: 'Invalid Id'});
                } else{
                    if(!task){
                        res.json({success: false, message: 'No tasks found'});
                    } else{
                        task.remove(function(err){
                            if(err){
                                res.json({success: false, message: err});
                            } else{
                                res.json({success: true, message: 'Task Deleted'});
                            }
                        })
                    }
                }
            });
        }
    });
    
   router.put('/task/', function(req,res){
       Task.update({_id: req.body._id},
           {$set:
               {
                   project: req.body.project,
                   task: req.body.task,
                   description: req.body.description,
                   assignee: req.body.assignee,
                   priority: req.body.priority,
                   status: req.body.status,
                   due_date: req.body.due_date
               }
           }, function(err){
                if(err){
                    res.json({success: false, message: err})
                } else{
                    res.json({success: true, message: 'Task Updated Successfully!'})
                }
        });
   });
    
    return router;
}