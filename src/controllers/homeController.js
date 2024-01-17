import nodeMailer from 'nodemailer';

export const homeIndex = (req, res) => {
   res.render('index');
}

export const homeSendEmail = (req, res) => {
   const { nome, email, mensagem } = req.body;

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

   const validateForm = () => {
      let error;

      const validateName = (nome) => {
         const regex = /[0-9]/;
         return regex.test(nome);
      }

      const validateEmail = (email) => {
         const regex = /\S+@\S+\.\S+/;
         return regex.test(email)
      }

      const checkWhiteSpace = (valor) => {
         const regex = /\S/;
         return regex.test(valor);
      }

      if(validateName(nome) || (nome.length <= 3) || (!checkWhiteSpace(nome))){
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