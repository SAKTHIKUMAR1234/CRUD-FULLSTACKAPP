const express = require('express')
const http = require('http')
require('dotenv').config()
const app = express()
const SocketIO = require('socket.io')
const EventEmitter = require('events')
const eventEmitter = new EventEmitter()
const emailSender = require('./util/mailSender')



const server = http.createServer(app)
const io = SocketIO(server)
let Mail_Message_Queue;
 
io.on('connection', (socket) => {
  console.log("Socket Connection Established")
  Mail_Message_Queue = [];
  socket.on('SendMail', (adminVerification) => {
    eventEmitter.emit('Start',adminVerification);
  })
})


const MailSendindService = async () =>{
  while(Mail_Message_Queue.length!=0){
    const startedTime = Date.now()
    const result = await emailSender(Mail_Message_Queue[0].email,Mail_Message_Queue[0].token)
    if(result){
     const SendedData = Mail_Message_Queue.shift()
     console.log(SendedData.email +"---->"+(Date.now()-startedTime)+"ms")
    }
  }
}



eventEmitter.on('Start',(adminVerification)=>{
  if(Mail_Message_Queue.length===0){
    Mail_Message_Queue.push(adminVerification)
    MailSendindService()
  }
  else{
    Mail_Message_Queue.push(adminVerification)
  }
})



server.listen(process.env.PORT, () => {
  console.log('MailMicroservice listening on port -->', process.env.PORT);
});