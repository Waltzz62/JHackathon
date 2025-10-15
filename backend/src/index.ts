import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { supabase } from './config/supabase'
import mainRouter from './routes/index.route'

dotenv.config()

export const app = express()
const PORT = process.env.PORT || 3000

app.use(
	cors({
		origin: ['http://localhost:5173'], //frontend application
		credentials: true
	})
);
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running' })
})

app.use('/api',mainRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 
