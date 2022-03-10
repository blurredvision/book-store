//Node modules needed for the schema
const mongoose = require('mongoose')

//Promise returns a native code
mongoose.Promise = global.Promise

//Schema for the Books model with all the column names and the data types
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    description:{
        type: String,
        required: true,
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    price:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true
    },
    releaseYear:{
        type: String,
        required: true,
        maxlength: [4, 'Please enter a valid year']
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    allocatedTo:{
        type: String,
        required: true,
        default: 'null'
    },
    bookStatus:{
        type: String,
        required: true,
        default: 'Waiting'
    }
}, {timestamps: true})

module.exports = mongoose.models.Book ||mongoose.model('Book', BookSchema)