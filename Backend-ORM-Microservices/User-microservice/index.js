const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router/index')
const errorHandler = require('../util/errorHandler')
const cookies = require('cookie-parser')
const dotenv = require('dotenv')
const path = require('path')


app.use(cookies());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname,'uploads')));
app.use(express.urlencoded({ extended: true }))
app.use(router);
dotenv.config()

app.use(errorHandler)



app.listen(process.env.PORT, () => {
    console.log("Auth-Proxy running at--->", process.env.PORT)
})




