
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    followers:[{
        type:mongoose.Types.ObjectId,
        ref:"followers"
    }],
    question:[{
        type:mongoose.Types.ObjectId,
        ref:"question"
    }],
    answers:[{
        type:mongoose.Types.ObjectId,
        ref:"answers"
    }],
    role:[ {
       
         type: Number,
         default: 0
    }]
}) 

const User = mongoose.model("User", UserSchema)

export default User