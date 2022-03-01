import mongoose from 'mongoose'

const AnswersSchema = new mongoose.Schema({
    AContent:{
        type:String,
    },
    
    question:{
      type:mongoose.Types.ObjectId,
      ref:"question"
    },
    imageUrl: {
        type: String,   
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

const Answers = mongoose.model("Answers", AnswersSchema)

export default Answers