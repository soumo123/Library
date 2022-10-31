const nodeMailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: "D:/A2Z/server/config/config.env" })




const sendEmail = async(options)=>{

    
    const transporter = nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        secure: false,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        },
        
    })
    console.log("options",options.email)
    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }


    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail