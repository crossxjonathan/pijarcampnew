const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service:"Gmail",
    secure:true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const registerEmail = async(userEmail,user) => {
    try{
        const emailToken = user.generateRegisterToken();

        let mailGenerator = new Mailgen({
            theme:"default",
            product:{
                name:"Pijar Camp",
                link:`${process.env.EMAIL_MAIL_URL}`
            }
        });
        
        const email = {
            body:{
                name:userEmail,
                intro:'Selamat datang di Pijar camp!!',
                action:{
                    instructions: 'Untuk melakukan validasi pada akun anda, silahkan klik di sini:',
                    button:{
                        color:'#1a73e8',
                        text: 'Validasi akun anda',
                        link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
                    }
                },
                // outro: 'Perlu bantuan, atau anda memiliki pertanyaan? Silahkan balas ke email ini'
            }
        }

        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject:"Selamat datang di Pijar Camp!!",
            html: emailBody
        };

        await transporter.sendMail(message);

        return true
    } catch(error){
        throw error;
    }
}


module.exports = {
    registerEmail
}