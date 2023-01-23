import express from 'express' // web framework
import bodyParser from 'body-parser' // parse JSON files
import mongoose from 'mongoose' // to interact with mongoDB
import cors from 'cors' // to enable cross-origin requests
import dotenv from 'dotenv' // enviroment files
import helmet from 'helmet' // protect HTTP headers
import morgan from 'morgan' // logger middleware
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'

// CONFIGURATION
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy( { policy: "cross-origin" }))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// ROUTES
app.use("/client", clientRoutes)
app.use("/general", generalRoutes)
app.use("/management", managementRoutes)
app.use("/sales", salesRoutes)


// MONGOOSE SETUP
const PORT = process.env.PORT || 9000
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch((error) => console.log(`{error}`))
