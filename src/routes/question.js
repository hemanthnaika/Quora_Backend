
import express from 'express'
import Question from '../services/mongodb/models/Question'
import { body, validationResult } from 'express-validator'
import { Console } from 'console'


const router = express.Router()

/*
type : GET
path : /api/v1/Question/all
params : none
isProtected: false (public)
*/


router.get('/all', async (req, res) => {
    try {
        const questions = await Question.find({})
        return res.status(200).json({ questions, message: "Successfully fetched question" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ questions: [], message: "Error fetching " })
    }
})

/*
type : POST
path : /api/v1/question/add
params : none

*/

router.post('/add',
     
    body('question').isLength({ min: 5}),
    
     async (req, res) => {

        const { errors } = validationResult(req)
        if (errors.length > 0) return res.status(403).json({ errors, message: "Bad request" })

        try {
            const questions = new Question(req.body);
            await questions.save()

            res.status(200).json({
              
                questions, message: "Saved question in DB"
            })
           
        } catch (error) {
            return res.status(500).json({
                questions: null,
                message: "Unable to save question in DB"
            })
        }
     
    })



/*
type : PUT
path : /api/v1/question/:id
params : none

*/

router.put('/update/:id'
    , async (req, res) => {
        const { id } = req.params
        try {
            const question = await Question.findOneAndUpdate({ _id: id }, req.body, {
                new: true
            })
            res.status(200).json({
                question, message: "Updated question in DB"
            })
        } catch (error) {
            return res.status(500).json({
                question: null,
                message: "Unable to update question in DB"
            })
        }
    })



/*
type : DELETE
path : /api/v1/question/:id
params : none

*/

router.delete('/delete/:id'
    , async (req, res) => {
        const { id } = req.params
        try {
            const question = await Question.findByIdAndRemove(id)
            res.status(200).json({
                question, message: "deleted question in DB"
            })
        } catch (error) {
            return res.status(500).json({
                question: null,
                message: "Unable to delete question in DB"
            })
        }
    })



export default router