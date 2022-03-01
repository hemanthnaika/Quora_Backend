
import express from 'express'
import User from '../services/mongodb/models/User'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import isAdmin from '../middlewares/isAdmin'
import { body, validationResult } from 'express-validator'


router.get('/users',async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({users,message:"Successfully fetched Users"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ users: [] })
    }
})

/*
type : POST
path : /api/v1/auth/signup
params : none
isProtected: false 
*/

router.post('/signup',
    body('firstName').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 4 })
    , async (req, res) => {

        const { errors } = validationResult(req)

        if (errors.length > 0) return res.status(403).json({ errors, message: "Bad request" })

        try {
            const { firstName, lastName = '', email, password } = req.body
            //Use bcrypt to hash password
            const salt = await bcrypt.genSalt(5)
            const hashedPassword = await bcrypt.hash(password, salt)

            const user = new User({ firstName, lastName, email, password: hashedPassword })

            await user.save()

            res.json({ user })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ users: {} })
        }
    })

/*
type : POST
path : /api/v1/auth/login
params : none
isProtected: false 
*/

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body
        //find the user
        const user = await User.findOne({ email })
        if (user) {
            const isVerified = await bcrypt.compare(password, user.password)
            if (isVerified) {
                const { _id, role } = user
                const token = jwt.sign({ _id, role }, process.env.JWT_SECRET, { expiresIn: "1h" })
                return res.json({ token })
            } else {
                return res.json({ token: null, message: "Unauthorised" })
            }
        }
        return res.json({ token: null, message: "User doesn't Exixst" })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ token: null })
    }
})


export default router