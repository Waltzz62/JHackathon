import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { supabase } from './config/supabase'
import mainRouter from './routes/index.route'
import { VercelRequest, VercelResponse } from '@vercel/node'

dotenv.config()

const app = express()

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['http://localhost']
        : ['http://localhost:5173'],
    credentials: true,
  })
)

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running' })
})

app.use('/api', mainRouter)

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => res.status(204).end())

// Export default for Vercel
export default (req: VercelRequest, res: VercelResponse) => app(req, res)
