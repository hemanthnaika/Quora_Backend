import mongoose from 'mongoose'


const QuestionSchema = new mongoose.Schema({
    content:{
             type:String
    },
    imageUrl: {
        type: String,
        
     },
    question:{
        type:String
    },
    Answers:[{
        type:String,
        
    }],
    User:{
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


const Question = mongoose.model('Question',QuestionSchema )

export default Question