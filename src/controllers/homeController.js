import nodeMailer from 'nodemailer';
import { validateName, validateEmail, checkWhiteSpace } from '../components/js/regexFunctions/functions.js';

export const homeIndex = (req, res) => {
   res.render('index');
}

export const homeSendEmail = (req, res) => {
   const { nome, email, mensagem } = req.body;

   let transporter = nodeMailer.createTransport({
      service: 'gmail',
      smtp: 'smtp.gmail.com',
      auth: {
         user: process.env.AUTH_USER,
         pass: process.env.AUTH_PASSWORD,
      },
      tls: {
         rejectUnauthorized: false
      }
   })

   const configEmail = {
      from: `${nome} <${email}>`,
      to: 'meusprojetos78@gmail.com',
      subject: 'Feedback - Pronto, Falei',
      text: mensagem,
   }

   const validateForm = () => {
      let error;

      if(validateName(nome) || nome.length <= 3 || !checkWhiteSpace(nome)){
         error = 'Nome inválido';
         res.status(400).json({ error });

      } else if(!validateEmail(email)){
         error = 'Email inválido'
         res.status(400).json({ error });

      } else if(!checkWhiteSpace(mensagem)){
         error = 'Digite sua mensagem'
         res.status(400).json({ error });

      } else {
         transporter.sendMail(configEmail, (err, info) => {
            try {
               res.status(200).json();
               console.log(info);
            } catch(err){
               console.log(err)
            }
         })
      }
   }

   validateForm();
}