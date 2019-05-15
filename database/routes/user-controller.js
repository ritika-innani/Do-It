var User = require('../mongodb/models/user');
var jwt = require('jsonwebtoken');
var config = require('../mongodb/util/config');

module.exports = function(router){

    router.post('/user', function(req, res){
        if(!req.body.name){
            res.json({success:false, message: 'Must provide a name'});
        } else{
            if(!req.body.email){
                res.json({success:false, message: 'Must provide an Email'});
            } else{
                if(!req.body.password){
                    res.json({success:false, message: 'Must provide password'});
                } else{
                    if(!req.body.company){
                        res.json({success:false, message: 'Must provide Company Name'});
                    } else {
                        let user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            company: req.body.company
                        });
                        user.save(function(err){
                            if(err){
                                if(err.code===11000){
                                    res.json({
                                        success:false, message: ' e-mail already registered'});
                                }
                                else{
                                    console.log(err);
                                    res.json({success: false, message: 'could not save user', err})
                                }

                            } else{
                                res.json({success: true, message: 'user saved'});
                            }
                        });
                    }
                }
            }
        }
    });
    
    router.use(function(req, res, next){
        var token = req.headers['authorization'];  
        if(!token){
            res.json({success: false, message: 'No tokens!'});
        } else{
            jwt.verify(token, '123456', function(err, decoded){
                if(err){
                    res.json({success: false, message: 'token invalid: ' + err})
                } else{
                    req.decoded = decoded;
                    next();
                }
            })
        }
    });
    
    router.get('/user',function(req,res){
        User.findOne({_id: req.decoded.userId}, function(err, user){
            if(err){
                res.json({success: false, message: err});
            } else{
                if(!user){
                    res.json({success: false, messag: 'User not found'});
                } else{
                    res.json({success: true, user: user});
                }
            }
        })
    });

    router.put('/user',function(req,res){
        User.update({_id: req.decoded.userId},{$set:
            {
                name: req.body.name,
                company: req.body.company
            }
        }, function(err, message){
            if(err){
                res.json({success: false, message: err});
            } else{
                res.json({success: true, message: 'User Data Updated Successfully!'});
            }
        })
    });

    router.get('/user/:company',function(req,res){
        User.find({company: {$regex: new RegExp("^" + req.params.company.toLowerCase(), "i")}}, function(err, users){
            if(err){
                res.json({success: false, message: err});
            } else{
                if(!users){
                    res.json({success: false, messag: 'No Users'});
                } else{
                    res.json({success: true, users: users});
                }
            }
        })
    });

    return router;
}