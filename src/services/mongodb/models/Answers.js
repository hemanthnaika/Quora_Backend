import mongoose from 'mongoose'

const AnswersSchema = new mongoose.Schema({
    content:{
             type:String
    },
    Question:{
        type:String,
        type:mongoose.Types.ObjectId,
        ref:"question"
    },
    Answers:[{
        type:String
    }],
    User:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    likes:{
        type:Number
    },
    isAnonymous:{
     type:Boolean
 },
 date: {
      type: Date, 
      default: Date.now }
})

const Answers = mongoose.model('Answers', AnswersSchema)

export default Answers