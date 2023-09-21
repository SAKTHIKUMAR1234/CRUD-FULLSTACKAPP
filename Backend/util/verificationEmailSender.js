const nodeMailer = require('nodemailer')

const sender = nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAILPASSWORD
    }
});

const emailSender =async (email,token) =>{

    const mailConfigurations = {
  
        from: process.env.EMAIL,
      
        to: email,
      
        subject: 'Email Verification for SignUp Registration',
          
        text: `Hi! To Complete the sign-up Process click this link --> http://localhost:5000/mainUser/verify/${token} 
               Thanks`
          
    };

    const result = await sender.sendMail(mailConfigurations);

    if(result instanceof Error){
        console.log(result);
        return false;
    }
    else{
        return true;
    }

}

module.exports=emailSender