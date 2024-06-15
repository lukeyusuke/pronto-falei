import Register from '../models/registerModel.js';
import { validateName, validateEmail, checkWhiteSpace, validatePhoneNumber } from '../components/js/regexFunctions/functions.js';

export const registerPage = (req, res) => {
   res.render('register');
}

export const createUser = async (req, res) => {
   const register = new Register();
   
   const { username, email, user_password, tel, dt_birth, genre } = req.body;

   let error;

   register.checkEmailExists(email)
      .then((emailExists) => {
         let userEmail = emailExists.shift();

         register.checkPhoneNumberExists(tel)
            .then((phoneNumberExists) => {
               let userPhone = phoneNumberExists.shift();

               register.create(username, email, user_password, tel, dt_birth, genre)
                  const validationRules = [
                     { validate: () => validateName(username) || username.length <= 3 || !checkWhiteSpace(username), errorMessage: 'Nome inválido'},
                     { validate: () => !validateName(email), errorMessage: 'Email inválido'},
                     { validate: () => userEmail, errorMessage: 'Este email já está em uso'},
                     { validate: () => user_password.length <= 3, errorMessage: 'Senha inválida'},
                     { validate: () => !validatePhoneNumber(tel) || tel.length < 15, errorMessage: 'Telefone inválido'},
                     { validate: () => userPhone, errorMessage: 'Este telefone já está em uso'},
                     { validate: () => dt_birth === '', errorMessage: 'Coloque sua data de nascimento!'},
                     { validate: () => genre === '', errorMessage: 'Selecione um gênero!',
                     },
                  ];
          
                  for (const { validate, errorMessage } of validationRules) {
                     if (validate()) {
                        return res.status(400).json({ error: errorMessage });
                     }
                  }
          
                  let success = 'Cadastro feito com sucesso!!';
                  res.status(200).json({ success });
               }
            )
      }).catch((err) => console.log(err));
   };