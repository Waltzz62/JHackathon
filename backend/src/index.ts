import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { supabase } from './config/supabase'
import mainRouter from './routes/index.route'

dotenv.config()

const app = express()

app.use(cors({
  origin: ['https://jhfront.vercel.app'], // 👈 allow your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running' })
})

app.use('/api', mainRouter)

// Handle favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204).end())

// ✅ Export Express app (not wrapped function)
export default app
