const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

// define a model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

userSchema.pre('save', (next) => {
    // if (!this.isModified('password')) {
    //     return next();
    // }

    // const user = this;

    // // encrypt
    // const salt = bcrypt.genSalt(10);
    // this.password = bcrypt.hash(this.password, salt);
    next();
});

// console.log(userSchema);

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    // bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    //     if (err) {
    //         return callback(err);
    //     }
    //     callback(null, isMatch);
    // });
};

// create the model class
const ModelClass = mongoose.model('user', userSchema);
module.exports = ModelClass;
