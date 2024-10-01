import Login from '../models/loginModel.js';

export const loginPage = (req, res) => {
   res.render('login'); 
}

export const searchAllUsers = (req, res) => {
   const login = new Login();

   login.listUsers()
      .then((users) => res.json(users))
      .catch(err => console.log(err));
}

export const loginUser = async (req, res) => {
   const login = new Login();
   const { email, password } = req.body;
   
   let error;
   
   login.checkEmailPasswordExists(email, password)
      .then(async (data) => {
         const dataUser = data.shift();

         if(!dataUser){
            error = 'Usuário e/ou senha inválido';
            res.status(400).json({ error });
         } else {
            req.session.user = {id: dataUser.user_id, username: dataUser.username, email: dataUser.email, password: dataUser.password};
            res.status(200).json({});
         }
      }).catch(err => console.log(err));   
}