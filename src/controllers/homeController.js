import nodeMailer from 'nodemailer';

export const homeIndex = (req, res) => {
   res.render('index');
}

export const homeSendEmail = (req, res) => {
   const { nome, email, mensagem } = req.body;
   console.log(email);

   let transporter = nodeMailer.createTransport({
      service: 'gmail',
      smtp: 'smtp.gmail.com',
      auth: {
         user: 'projetostestando@gmail.com',
         pass: 'lcbv kuah nfii lajg'
      },
      tls: {
         rejectUnauthorized: false
      }
   })

   const configEmail = {
      from: `${nome} <${email}>`,
      to: 'projetostestando@gmail.com',
      subject: 'Feedback - Pronto, Falei',
      text: mensagem,
   }

   transporter.sendMail(configEmail, (err, info) => {
      try {
         res.status(200).json();
         console.log(info);
      } catch(err){
         console.log(err)
      }
   })
}