import mongoose from 'mongoose'


const QuestionSchema = new mongoose.Schema({
    content:{
             type:String
    },
    Answers:[{
        type:String,
        type:mongoose.Types.ObjectId, 
        ref:"Answers"
    }],
    User:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    Question:[{
        type:String
    }],
    likes:{
        type:Number
    },
 isAnonymous:{
     type:Boolean
 },
 date: {
    type: Date, 
    default: Date.now 
}

})


const Question = mongoose.model("Question",QuestionSchema )

export default Question