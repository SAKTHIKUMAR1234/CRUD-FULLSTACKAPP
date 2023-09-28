const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./router/index')
const errorHandler = require('./util/errorHandler')
require('./models/associatons')


dotenv.config()
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(express.json())
app.use(errorHandler)
app.use(router)
app.use(express.urlencoded({ extended: true }))



app.listen(process.env.PORT, () => {
    console.log("Main API GATEWAY--->" + process.env.PORT)
})







