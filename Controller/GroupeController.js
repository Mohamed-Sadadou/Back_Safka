const Challenge = require("../Models/Challenge");
const Groupe = require("../Models/Groupe");
function createdate() {
    var date = Date.now();
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
};
const CodifiIdGroupe = () => {
    return ['Groupe', createdate(), Math.floor(Math.random() * 100)].join('_');
};
module.exports.CreateGroupe = async (req, res) => {

    console.log('on affiche le req  ', req.body);
    console.log('on affiche le req  ', req.files);

    Links = [];
    await req.files.forEach(function (y) {
        Links.push(y.path);
    })

    const Id_groupe = CodifiIdGroupe();

    const GRP = new Groupe({
        Id_groupe,
        GroupeName: req.body.GroupeName,
        ProfilePic: Links,
        Preference : req.body.Preference,
        Membres:[],
        Points:0,

    });
    GRP.save()
        .then(() => res.status(201).json({ message: 'Groupe créé !' }))
        .catch(error => res.status(400).json({ error }));


};
module.exports.GetAllGroupe = async (req, res) => {
    const Groupes = await Groupe.find();
    res.status(200).json(Groupes);
};
module.exports.GetGroupe = (req, res) => {
    Groupe.find({ Id_groupe: req.body.Id_groupe }, (err, docs) => {
        if (!err) res.status(200).json(docs);
        else console.log(' on a un souci : ' + err);
    });
};
module.exports.AddMembre = async (req, res) => {
    try {
        await Groupe.findOneAndUpdate(
            { Id_groupe: req.body.Id_groupe },
            { $addToSet: { Membres: req.body.IdUser } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).then((docs) => { console.log("---- ok ----"); return res.status(200); })
            .catch((err) => { return res.status(500).send({ message: err }); })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
module.exports.EnleverPreference = async (req, res) => {
    try {
        await Groupe.findOneAndUpdate(
            { Id_groupe: req.body.Id_groupe },
            { $pull: { Membres: req.body.IdUser } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).then((docs) => { console.log("---- ok ----"); return res.status(200); })
            .catch((err) => { return res.status(500).send({ message: err }); })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}