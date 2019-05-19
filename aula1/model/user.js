const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    created: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next) {
    let user = this;
    console.log(`USER: ${user}`)

    if (!user.isModified('password')) return next();

    console.log("encriptando...");

    bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted;
        return next();
    });
});

module.exports = mongoose.model('User', UserSchema);