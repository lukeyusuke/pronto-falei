import Vent from "../models/ventModel.js";
import { checkWhiteSpace } from '../components/js/regexFunctions/functions.js';

export const ventPage = (req, res) => {
    if(req.session.user){
        res.render('vent', {user: req.session.user});
    } else {
        res.status(401).send('Você ainda não fez o Login');
    }
}

export const searchAllVents = (req, res) => {
    const vent = new Vent();
 
    vent.listVents()
       .then((users) => res.json(users))
       .catch(err => console.log(err));
 }

export const createVent = (req, res) => {
    const vent = new Vent();
    const { title, subtitle, main_text } = req.body; 
    let error;
    
    vent.create(title, subtitle, main_text)
        .then(() => {
            if(!checkWhiteSpace(title) || title === 'Coloque seu título aqui') {
                error = 'Título inválido';
                res.status(400).json({ error });

            } else if(!checkWhiteSpace(subtitle) || subtitle === 'Coloque seu subtítulo aqui'){
                error = 'Subtítulo inválido';
                res.status(400).json({ error });

            } else if(!checkWhiteSpace(main_text) || main_text === 'Escrever...'){
                error = 'Texto inválido';
                res.status(400).json({ error });

            } else {
                let success = 'Desabafo postado com sucesso!!';
                res.status(200).json({success, user: req.session.user});
            }
        })
        .catch(err => console.log(err))
}