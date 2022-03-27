const Challenge = require("../Models/Challenge");

function createdate() {
    var date = Date.now();
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
};
const CodifiIdChallenge = () => {
    return ['Challenge', createdate(), Math.floor(Math.random() * 100)].join('_');
};
const CodifiIdStorie = () => {
    return ['Storie', createdate(), Math.floor(Math.random() * 100)].join('_');
};



module.exports.CreateChallenge = async (req, res) => {
    console.log('on affiche le req  ', req.body);
    console.log('on affiche le req  ', req.files);

    Links = [];
    await req.files.forEach(function (y) {
        Links.push(y.path);
    })
    const Id_Challenge = CodifiIdChallenge();
    const {
        Titre,
        Theme,
        Description,
        Point,
        Type,
        PlaceToGo,
    } = req.body;

    const Chal=  new Challenge({
        Id_Challenge,
        Titre,
        Theme,
        Description,
        Image:Links,
        Point,
        Type,
        PlaceToGo,
    });
    Chal.save()
        .then(() => res.status(201).json({ message: 'Challenge créé !' }))
        .catch(error => res.status(400).json({ error }));


};
module.exports.GetAllChallenges = async (req,res)=>{
    const Challenges = await Challenge.find();
    res.status(200).json(Challenges);
};
module.exports.GetChallenge = (req, res) => {
    Challenge.find({Id_Challenge:req.body.Id_Challenge}, (err, docs) => {
        if (!err) res.status(200).json(docs);
        else console.log(' on a un souci : ' + err);
    });
};

module.exports.AjoutStorie = async (req,res)=>{

    console.log('on affiche le req  ', req.body);
    console.log('on affiche le req  ', req.files);
    Links = [];
    await req.files.forEach(function (y) {
        Links.push(y.path);
    })

    let story = {
        Id_Storie:CodifiIdStorie(),
        Auteur : req.body.User,
        Image : Links,
    }

    Challenge.findOneAndUpdate(
        { Id_Challenge: req.body.Id_Challenge },
        { $addToSet: { Stories: story } },
        (err, docs) => {
            if (!err) {
                console.log('pas derreur');
                return res.status(200).json({ message: ' Modification du Challenge effectuer ajout de la story du user' });

            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).send({ error: err });
            }
        }
    )
}

module.exports.EnleverStorie = async (req, res) => {
    Challenge.findOneAndUpdate(
        { Id_Challenge: req.body.Id_Challenge },
        {
            $pull: {
                Stories: {
                    Id_Storie: req.body.Id_Storie
                }
            }
        },

        (err, docs) => {
            if (!err) {
                console.log('pas derreur');
                return res.status(200).json({ message: ' Modification du challenge effectuer ' });

            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).send({ error: err });
            }
        }
    )
};
//
module.exports.ModifierTitre =  async(req,res) =>{
    try {
        await Challenge.findOneAndUpdate(
            { Id_Challenge: req.body.Id_Challenge },
            { $set: { Titre: req.body.Titre } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).then((docs) => { console.log("---- ok ----"); return res.status(200).json({ message: "modification effectuer avec succés" }); })
            .catch((err) => { return res.status(500).send({ message: err }); })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//
module.exports.ModifierTheme =  async(req,res) =>{
    try {
        await Challenge.findOneAndUpdate(
            { Id_Challenge: req.body.Id_Challenge },
            { $set: { Theme: req.body.Theme } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).then((docs) => { console.log("---- ok ----"); return res.status(200).json({ message: "modification effectuer avec succés" }); })
            .catch((err) => { return res.status(500).send({ message: err }); })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//
module.exports.ModifierDescription =  async(req,res) =>{
    try {
        await Challenge.findOneAndUpdate(
            { Id_Challenge: req.body.Id_Challenge },
            { $set: { Description: req.body.Description } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).then((docs) => { console.log("---- ok ----"); return res.status(200).json({ message: "modification effectuer avec succés" }); })
            .catch((err) => { return res.status(500).send({ message: err }); })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//
module.exports.ModifierPoint =  async(req,res) =>{
    try {
        await Challenge.findOneAndUpdate(
            { Id_Challenge: req.body.IdHistoire },
            { $set: { Point: req.body.Point } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).then((docs) => { console.log("---- ok ----"); return res.status(200).json({ message: "modification effectuer avec succés" }); })
            .catch((err) => { return res.status(500).send({ message: err }); })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//
module.exports.ModifierType =  async(req,res) =>{
    try {
        await Challenge.findOneAndUpdate(
            { Id_Challenge: req.body.Id_Challenge },
            { $set: { Type: req.body.Type } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).then((docs) => { console.log("---- ok ----"); return res.status(200).json({ message: "modification effectuer avec succés" }); })
            .catch((err) => { return res.status(500).send({ message: err }); })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//
module.exports.ModifierPlaceToGo =  async(req,res) =>{
    try {
        await Challenge.findOneAndUpdate(
            { Id_Challenge: req.body.Id_Challenge },
            { $set: { PlaceToGo: req.body.PlaceToGo } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).then((docs) => { console.log("---- ok ----"); return res.status(200).json({ message: "modification effectuer avec succés" }); })
            .catch((err) => { return res.status(500).send({ message: err }); })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
//
