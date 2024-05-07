import Profile from '../models/profileModel.js';

export const profilePage = (req, res) => {
    if(req.session.user){
        res.render('profile');
    } else {
        res.status(401).send('Você ainda não fez o Login');
    }
}

export const deleteUser = (req, res) => {
    const profile = new Profile();

    profile.delete(req.session.user.id)
        .then((data) => {
            console.log(data);
            let success = 'Usuário excluído com sucesso';
            res.status(200).json({ success });
        })
}

export const selectUser = (req, res) => {
    const profile = new Profile();

    profile.selectUser(req.session.user.id)
        .then((data) => {
            const dataUser = data.shift();
            res.status(200).json({ dataUser });
        })
}