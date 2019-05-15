var User = require('../mongodb/models/user');
var jwt = require('jsonwebtoken');
var config = require('../mongodb/util/config');

module.exports = function(router){
    
    router.post('/authenticate', function(req,res){
        if(!req.body.email){
            res.json({success: false, message: 'Please provide a Email'});
        } else{
            if(!req.body.password){
                res.json({success: false, message: 'Please provide a password'});
            } else{
                User.findOne({email: req.body.email}, function(err, user){
                    if(err){
                        res.json({success: false, message: err});
                    } else{
                        if(!user){
                            res.json({success: false, message: 'username or password invalid'}); 
                        } else{
                            var validPassword = user.comparePassword(req.body.password);
                            if(!validPassword){
                                res.json({success: false, message: 'username or password invalid'}); 
                            } else{
                                var token = jwt.sign({ userId: user._id}, '123456', {expiresIn: '24h'});
                                res.json({success:true, message:'success!', user: {userId: user._id, name: user.name, email: user.email, company: user.company}, token:token})
                            }
                        }
                    }
                });
            }
        }
    });
    
    return router;
}