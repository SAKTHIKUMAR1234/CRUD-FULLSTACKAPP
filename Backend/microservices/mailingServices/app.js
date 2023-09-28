const express =require('express')
const app=express()
const cors = require('cors')
const bodyparser = require('body-parser')
const router = require('./router/index')





app.use(cors({origin:'http://localhost:5000'}))
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(router)
const server = app.listen(3000,()=>{
    console.log("Mail microservice is listening on port",3000);
})
