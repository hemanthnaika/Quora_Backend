
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
        const { questionId } = req.query
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
    body('id'),
    body('content').isLength({min:5}),
    body('question').isLength({ min: 5}),
    body('Answers').isLength({min:5}),
    //body('description').isLength({ min: 10 }),
     async (req, res) => {

        const { errors } = validationResult(req)
        if (errors.length > 0) return res.status(403).json({ errors, message: "Bad request" })

        try {
            const answer = new Answers(req.body);
            await answer.save()

            res.status(200).json({
              
                answer, message: "Saved Answers in DB"
            })
           
        } catch (error) {
            return res.status(500).json({
            answer: null,
                message: "Unable to save question in DB"
            })
        }
     
    })


/*
type : PUT
path : /api/v1/answers/:id
params : id

*/


router.put('/update/:id'
    , async (req, res) => {
        const { id } = req.params
        try {
            if (req.body.question) {
                const question = await Question.findById(req.body.question)
                if (!question) return res.status(300).json({
                    answers: null,
                    message: "Invalid answers"
                })
            }

            const answers = await Answers.findOneAndUpdate({ _id: id }, req.body, {
                new: true
            })
            res.status(200).json({
                answers, message: "Updated answers in DB"
            })
        } catch (error) {
            return res.status(500).json({
                answers: null,
                message: "Unable to update answers in DB"
            })
        }
    })

/*
type : DELETE
path : /api/v1/answers/:id
params : id

*/

router.delete('/delete/:id'
    , async (req, res) => {
        const { id } = req.params
        try {
            const question = await Answers.findByIdAndRemove(id)
            res.status(200).json({
                question, message: "deleted answers in DB"
            })
        } catch (error) {
            return res.status(500).json({
                question: null,
                message: "Unable to delete answers in DB"
            })
        }
    })



// /*
// type : PUT
// path : /api/v1/product/updateStock/:id
// params : id
// isProtected: true (admin)
// */


// router.put('/updateStock/:id'
//     , async (req, res) => {
//         const { id } = req.params
//         try {
//             const category = await Product.findByIdAndRemove(id)
//             res.status(200).json({
//                 category, message: "deleted category in DB"
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 category: null,
//                 message: "Unable to delete category in DB"
//             })
//         }
//     })



export default router