import mongoose from 'mongoose'


const QuestionSchema = new mongoose.Schema({
    questionContent:{
             type:String,
    },
    imageUrl: {
        type: String,
        
     },
    answers:{
        type:mongoose.Types.ObjectId,
        ref:"Answers"
        
    },
    Users:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    likes:[{
        type:Number
    }],
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