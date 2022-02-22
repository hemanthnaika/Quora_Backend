
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './services/mongodb/connectDB'
dotenv.config()
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import questionRoutes from './routes/question'
import answersRoutes from './routes/answers'
process.env.JWT_KEY

const app = express()
const port = process.env.PORT || 3003

connectDB()

app.use(cors())
app.use(express.json())

//route to handle auth requests
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/question", questionRoutes)
app.use("/api/v1/answers", answersRoutes)

app.get('/', (req, res) => {
    res.send(`Server running at ${port}`)
})

app.listen(port, (req, res) => {
    console.log(`Server listening at PORT ${port}`)
})
