const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('../util/errorHandler')
const router = require('./router/index')
const db = require('../config/database')
const dotenv = require('dotenv')


app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)
app.use(router)
dotenv.config()

db.sync({alter:true}).then(() => {
    app.listen(3003, () => {
        console.log("Admin Proxy Server--->", 3003)
    })
})
