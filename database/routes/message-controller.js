var Message = require('../mongodb/models/userMessage');
var jwt = require('jsonwebtoken');

module.exports = function(router){
    router.get('/message/:email', function(req,res) {
        if (req.params.email) {
            Message.find({email: req.params.email}, function (err, message) {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    if (!message) {
                        res.json({success: false, message: 'No notifications'});
                    } else {
                        res.json({success: true, messages: message});
                    }
                }
            });
        }
    });

return router;
}