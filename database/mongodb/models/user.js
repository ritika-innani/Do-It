var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var db = require('../util/dbconnect');
var bcrypt = require('bcrypt-nodejs');

let emailChecker = function(email){
    if(!email){
        return false;
    } else{
        if(email.length < 5 || email.length > 30){
            return false;
        } else{
            const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            return regExp.test(email);
        } 
    }
};

var emailValidators = [{
    validator: emailChecker,
    message: 'Please provide valid Email'
}];

var userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, validate: emailValidators},
    password: {type: String, required: true},
    company: {type: String, required: true}
});

// Schema Middleware to Encrypt Password
userSchema.pre('save', function(next) {
    // Ensure password is new or modified before applying encryption
    if (!this.isModified('password'))
        return next();

    // Apply encryption
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err); // Ensure no errors
    this.password = hash; // Apply encryption to password
    next(); // Exit middleware
});
});

// Methods to compare password to encrypted password upon login
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
};

module.exports = db.model('User', userSchema);