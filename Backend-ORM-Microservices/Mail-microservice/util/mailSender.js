const nodeMailer = require('nodemailer')
require('dotenv').config()


const credentials = nodeMailer.createTransport(
    {
        service:process.env.MAIL_SERVICE_PROVIDER,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD
        }
    }
)


const emailSender = async (email,token)=>{

    const mailConfigurations = {
        
        from: 'sakthi123msd@gmail.com',
      
        to: email,
      
        subject: 'Email Verification for SignUp Registration',
          
        text: `Hi! To Complete the sign-up Process click this link --> http://localhost:5000/admin/services/verify/${token} 
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