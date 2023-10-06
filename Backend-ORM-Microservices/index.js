const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./router/index')
const errorHandler = require('./util/errorHandler')
const cookies = require('cookie-parser')
require('./models/associatons')
const db = require('./config/database')



app.use(cookies())
app.use(express.json({extended:true}))
app.use(cors({ origin: true, credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(router)
dotenv.config()

app.use(errorHandler)

db.sync({alter:true}).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Main API GATEWAY--->" + process.env.PORT)
    })
})









