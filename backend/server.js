import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { errorHandler, errorNotFound } from './middlewares/errorHandler.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'

dotenv.config()

connectDB();

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/v1/api/product', productRoutes)
app.use('/v1/api/user', userRoutes)
app.use('/v1/api/order', orderRoutes)
app.use('/v1/api/upload', uploadRoutes)

app.get('/v1/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'API are ready' })
  })  
}

app.use(errorNotFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server run in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
