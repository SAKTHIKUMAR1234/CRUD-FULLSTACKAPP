const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('../util/errorHandler')
const router = require('./router/index')
const db = require('../config/database')
const dotenv = require('dotenv')
const cookies=require('cookie-parser')


app.use(cors({
    origin: true,
    credentials: true,
}))
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookies())
app.use(router)

app.use(errorHandler)


db.sync({alter:true}).then(() => {
    app.listen(3003, () => {
        console.log("Admin MicroService--->", 3003)
    })
})
