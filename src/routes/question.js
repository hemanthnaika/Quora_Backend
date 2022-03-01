
import express from 'express'
import Question from '../services/mongodb/models/Question'
import { body, validationResult } from 'express-validator'



const router = express.Router()

/*
type : GET
path : /api/v1/Question/all
params : none
isProtected: false (public)
*/


router.get('/all', async (req, res) => {
try {
    const question=await Question.aggregate([
      {
          $lookup:{
              from:"answers",
              localField:"_id",
              foreignField:"question",
              as:"allAnswers"
          }
      }
    ])
    res.status(200).json({question,message:"Successfully fetched Question"})
} catch (error) {
    console.log(error.message)
    res.status(500).json({question:[],message:"error fetching Question"})
}
})
/*
type : POST
path : /api/v1/question/add
params : none

*/

router.post('/add',
    body('questionContent').isLength({ min: 5}),
     async (req, res) => {
        const { errors } = validationResult(req)
        if (errors.length > 0) return res.status(403).json({ errors, message: "Bad request" })

        try {
            const questions = new Question(req.body);
            await questions.save()
            res.status(200).json({
                questions, message: "Successfully Added the  Question"
            })
           
        } catch (error) {
            return res.status(500).json({
                questions: null,
                message: "Unable to save question in DB"
            })
        }
     
    })




export default router