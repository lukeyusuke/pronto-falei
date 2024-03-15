import Vent from "../models/ventModel.js";

export const ventPage = (req, res) => {
    res.render('vent');
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

    vent.create(title, subtitle, main_text)
        .then(vents => res.json(vents))
        .catch(err => console.log(err))
}