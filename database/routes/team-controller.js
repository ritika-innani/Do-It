var Team = require('../mongodb/models/team');
var Message = require('../mongodb/models/userMessage');
var jwt = require('jsonwebtoken');

module.exports = function(router){

    router.post('/team', function(req, res){
       if(!req.body.memberId){
           res.json({success: false, message: "no user added"});
       } else{
           let team = new Team({
               email: req.body.userEmail,
               member: req.body.memberId
           });
           console.log(team);
           team.save(function(err){
               if(err){
                   console.error(err);
                   res.json({success: false, message: 'could not add member', err})
               }
               else{
                    let message = new Message({
                        email: req.body.memberId,
                        message: 'You have been added to the team by ' + req.body.userEmail
                    });
                    console.log(message);
                    message.save(function(err){
                        if(err){
                            res.json({success: false, message: 'could not send invite', err})
                        } else{
                            res.json({success: true, message: 'Successfully added'})
                        }
                    })
               }
           });
       }
    });

    router.get('/team/:email', function(req,res) {
        if (req.params.email) {
            Team.find({email: req.params.email}, function (err, team) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    if (!team) {
                        res.json({success: false, message: 'No team added yet'});
                    } else {
                        res.json({success: true, teams: team});
                    }
                }
            });
        }
    });



    return router;
}