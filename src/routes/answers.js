
import express from 'express'
import Answers from '../services/mongodb/models/Answers'
import { body, validationResult } from 'express-validator'
import Question from '../services/mongodb/models/Question'

const router = express.Router()

/*
type : GET
path : /api/v1/answers/all
params : none
query:QuestionId

*/

router.get('/all', async (req, res) => {
    try {
        
        const answers = await Answers.find({})
        return res.status(200).json({ answers, message: "Successfully fetched answers" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ answers: [], message: "error fetching answers" })
    }
})



/*
type : POST
path : /api/v1/answers/add
params : none

*/
router.post('/add',
    body('AContent').isLength({ min: 3 }),
    body('question').isLength({ min: 5 }),
    async (req, res) => {

        const { errors } = validationResult(req)

        if (errors.length > 0) return res.status(403).json({ errors, message: "BAD REQUEST , VALIDATION FAILED" })

        try {
            const question = await Question.findById(req.body.question)
            if (!question) return res.status(300).json({ answers: null, message: "Invalid question" })
            const answers = new Answers(req.body)
            await answers.save()
            res.status(201).json({ answers, message: "Answer added successfully" })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ answers: null, message: "Error adding answer" })
        }
    })


export default router