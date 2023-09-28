const server = require('http').createServer()
const io = require('socket.io')(server);
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const pubClient = createClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();


io.on('sendMail',()=>{
    console.log("Hello")
})


const mailTrigger = (email,token) =>{

    server.listen(9000,()=>{
        console.log("Bacj");
    })

    io.adapter(createAdapter(pubClient, subClient));
    io.emit('sendMail')
}


module.exports = mailTrigger