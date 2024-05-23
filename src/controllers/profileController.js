import Profile from '../models/profileModel.js';

export const profilePage = (req, res) => {
    if(req.session.user){
        res.render('profile');
    } else {
        res.status(401).send('Você ainda não fez o Login');
    }
}

export const selectUser = (req, res) => {
    const profile = new Profile();

    profile.selectUser(req.session.user.id)
        .then((data) => {
            const dataUser = data.shift();
            res.status(200).json({ dataUser });
        }).catch((err) => {
            res.status(500).json({ error: 'Erro ao buscar usuário'});
        })
}

export const updateUser = (req, res) => {
    const profile = new Profile();
    const {username, email, user_password, tel, dt_birth, genre} = req.body;

    const updateFields = Object.fromEntries(
        Object.entries({ username, email, user_password, tel, genre })
            .filter(([, value]) => value)
    );

    profile.updateUser(req.session.user.id, updateFields)
        .then(() => {
            let success = 'Usuário atualizado com sucesso!';
            res.status(200).json({ success });
        })
        .catch(() => {
            res.status(500).json({error: 'Erro ao atualizar usuário'});
        })
}

export const deleteUser = (req, res) => {
    const profile = new Profile();

    profile.deleteUser(req.session.user.id)
        .then(() => {
            let success = 'Usuário excluído com sucesso';
            res.status(200).json({ success });
        })
}
