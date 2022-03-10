//Node modules need to create the schema
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//Promise returns a native code
mongoose.Promise = global.Promise

//Schema for the User model with all the column names and the data types
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        required: true,
        default: 'client',
    },
    credits: {
        type: String,
        required: true,
        default: '50'
    }
}, { timestamps: true})

//Virtual makes it so that the user model has a books column with all the books that the user has requested 
UserSchema.virtual("books",{
    ref: "Book",
    foreignField: "createdBy",
    localField: "_id"
})

//Sets the virtual to json object
UserSchema.set('toJSON', {virtuals: true})

//Make sure that the password is hashed, if its already hased it moves on
UserSchema.pre('save', function(next){
    if(!this.isModified('password'))
        return next()
    bcrypt.hash(this.password,15,(err,passwordHash) =>{
        if(err)
            return next(err)
        this.password = passwordHash
        next()
    })
})

//This function compares password
UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password,(err,isMatch) => {
        if(err)
            return cb(err)
        else{
            if(!isMatch)
                return cb(null, isMatch)
            return cb(null,this)
        }
    })
}


module.exports = mongoose.models.User ||mongoose.model('User', UserSchema)
