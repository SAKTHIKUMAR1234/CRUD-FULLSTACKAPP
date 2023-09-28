const nodeMailer = require('nodemailer')


const credentials = nodeMailer.createTransport(
    {
        service:'gmail',
        auth:{
            user:'sakthi123msd@gmail.com',
            pass:'wmpddlnbdlbpsvis'
        }
    }
)


const emailSender = async (email,token)=>{

    const mailConfigurations = {
        
        from: 'sakthi123msd@gmail.com',
      
        to: email,
      
        subject: 'Email Verification for SignUp Registration',
          
        text: `Hi! To Complete the sign-up Process click this link --> http://localhost:5000/mainUser/verify/${token} 
               Thanks`
          
    };

    try {
        await credentials.sendMail(mailConfigurations)
        return true
    } catch (error) {
        console.log(error);
        return false
    }


    

}


module.exports=emailSender