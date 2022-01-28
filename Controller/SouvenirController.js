

const Souvenir = require("../Models/Souvenir");

const CodifiIdSouvenir = () => {
    return ['Souvenir', Math.floor(Math.random() * 10000)].join('_');
};

module.exports.AjoutSouvenir = async(req,res)=>{
    Links = [];
    await req.files.forEach(function (y) {
        Links.push(y.path);
    });

    const Id_Souvenir = CodifiIdSouvenir();
    const Public = req.body.Public


    const souvenir =  new Souvenir({
        Id_Souvenir,
        Image:Links,
        Public,
    });
    souvenir.save()
        .then(() => res.status(201).json({ message: 'souvenir créé !' }))
        .catch(error => res.status(400).json({ error }));
};
module.exports.EnleverSouvenir = async (req, res) => {
    try {
        
        await Souvenir.remove({ Id_Souvenir: req.body.Id_Souvenir }).exec();
        res.status(200).json({ message: "Suppression effectuer avec succes. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
module.exports.SouvenirPublic = async (req, res) => {

    try {
        await Souvenir.findOneAndUpdate(
            { Id_Souvenir: req.body.Id_Souvenir },
            { $set: { Public: true } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) { console.log("---- ok ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
module.exports.SouvenirPrivate = async (req, res) => {

    try {
        await Souvenir.findOneAndUpdate(
            { Id_Souvenir: req.body.Id_Souvenir },
            { $set: { Public: false } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) { console.log("---- ok ----"); return res.status(200).json(docs); }
                else { return res.status(500).send({ message: err }); }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
module.exports.GetSouvenir = (req, res) => {
    Souvenir.find({Id_Souvenir:req.body.Id_Souvenir}, (err, docs) => {
        if (!err) res.status(200).json(docs);
        else console.log(' on a un souci : ' + err);
    });
};
module.exports.GetallSouvenir = async (req, res) => {
    const Souv = await Souvenir.find({Public:true});
    res.status(200).json(Souv);
};