const EventEmitter = require('events');

const eventEmitter = new EventEmitter();
const router = require('express').Router();
const emailSender = require('../services/mailSender');


const queue = [];

eventEmitter.on("send", async (email,token) => {

    const data ={
        "email":email,
        "token":token
    }
    
    if(queue.length===0){
        queue.push(data);
        fun();
    }
    else{
        queue.push(data)
    }

})

const fun = async () => {


    while(queue.length!==0){
        const result = await emailSender(queue[0].email,queue[0].token);
        if(result){
            queue.shift();
        }
    }

}

router.post('/send', async (req, res) => {

    const { email, token } = req.body;

    try {
        eventEmitter.emit('send', email,token);
        res.status(200).json({
            "status" : "Success",
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            "status" : "error",
        })
    }
    

});

module.exports = router