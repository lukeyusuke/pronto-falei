import Profile from '../models/profileModel.js';

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
    const {username, email, password, tel} = req.body;

    const updateFields = Object.fromEntries(
        Object.entries({ username, email, password, tel })
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
