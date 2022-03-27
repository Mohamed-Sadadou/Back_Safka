const Challenge = require("../Models/Challenge");
const Histoire = require("../Models/Histoire");
const Chapitre = require("../Models/Chapitre");
function createdate() {
    var date = Date.now();
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
};
const CodifiIdHistoire = () => {
    return ['Histoire', createdate(), Math.floor(Math.random() * 100)].join('_');
};
const CodifiIdChapitre = () => {
    return ['Chapitre', createdate(), Math.floor(Math.random() * 100)].join('_');
};

//TESTED
module.exports.CreateHistoire = async (req, res) => {
    console.log('on affiche le req  ', req.body);
    console.log('on affiche le req  ', req.files);

    Links = [];
    await req.files.forEach(function (y) {
        Links.push(y.path);
    })
    const IdHistoire = CodifiIdHistoire();
    const {
        Titre,
        Description,
        TypeHistoire,
        Longuer,
        Points,
    } = req.body;

    const his = new Histoire({
        IdHistoire,
        Titre,
        Description,
        Image: Links,
        TypeHistoire,
        Longuer,
        Points,
        Nbr_Users: 0,
    });

    his.save()
        .then(() => res.status(201).json({ message: 'Histoire créé !' }))
        .catch(error => res.status(400).json({ message: error }));


};
//TESTED
module.exports.GetAllHistoire = async (req, res) => {
    
    const his = await Histoire.find().populate('Chapitres.Challenges').sort({ TypeHistoire: 1 });
    res.status(200).json(his);
    
/*
    await Histoire.aggregate([
        {$lookup: {
            "from": "Challenge",
            "let": {"Challenges": "$Id_Challenge"},
            pipeline: [
              {
                "$match": {
                  "$expr": {
                    "$in": ["$$userId", "$users.uId"],  
                  },
                },
              },
            ],
            as: "details"
          }}, {
            $lookup: {
                from: "utilisateurschemas",
                localField: "Etudiant2",
                foreignField: "_id",
                as: "etudiant2"
            }
        }
    ]).then(users => {
        console.log(users);
        res.status(200).json(users);
    }).catch();
*/
};
//TESTED
module.exports.GetHistoire = (req, res) => {
    Histoire.find({ IdHistoire: req.body.IdHistoire }, (err, docs) => {
        if (!err) res.status(200).json(docs);
        else console.log(' on a un souci : ' + err);
    }).sort({ TypeHistoire: 1 });
};


module.exports.ModifiTitreHistoire = async (req, res) => {

    try {
        await Histoire.findOneAndUpdate(
            { IdHistoire: req.body.IdHistoire },
            { $set: { Titre: req.body.Titre } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).then((docs) => { console.log("---- ok ----"); return res.status(200).json({ message: "modification effectuer avec succés" }); })
            .catch((err) => { return res.status(500).send({ message: err }); })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
module.exports.ModifiDescriptionHistoire = async (req, res) => {

    try {
        await Histoire.findOneAndUpdate(
            { IdHistoire: req.body.IdHistoire },
            { $set: { Description: req.body.Description } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).then((docs) => { console.log("---- ok ----"); return res.status(200).json({ message: "modification effectuer avec succés" }); })
            .catch((err) => { return res.status(500).send({ message: err }); })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

//***** Chapitre modif ******/
module.exports.AjoutChapitreHistoire = async (req, res) => {

    Links = [];
    await req.files.forEach(function (y) {
        Links.push(y.path);
    })

    const {
        Titre,
        Theme,
        Description,
    } = req.body;

    let chap = {
        ID_Chapitre: CodifiIdChapitre(),
        Titre,
        Theme,
        Image: Links,
        Description,
        Challenges: [],
    }

    Histoire.findOneAndUpdate(
        { IdHistoire: req.body.IdHistoire },
        { $addToSet: { Chapitres: chap } },
        (err, docs) => {
            if (!err) {
                console.log('pas derreur');
                return res.status(200).json({ message: ' Modification du chapitre effectuer ' });

            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).send({ error: err });
            }
        }
    )
};
//*************************/
module.exports.EnleverChapitreHistoire = async (req, res) => {
    Histoire.findOneAndUpdate(
        { IdHistoire: req.body.IdHistoire },
        {
            $pull: {
                Chapitres: {
                    ID_Chapitre: req.body.ID_Chapitre
                }
            }
        },

        (err, docs) => {
            if (!err) {
                console.log('pas derreur');
                return res.status(200).json({ message: ' Modification du chapitre effectuer ' });

            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).send({ error: err });
            }
        }
    )
};
//*************************/
module.exports.ModifiChapitreTitreHistoire = async (req, res) => {
    Histoire.findOneAndUpdate(
        { IdHistoire: req.body.IdHistoire },
        { $set: { "Chapitres.$[element].Titre": req.body.Titre } },
        { arrayFilters: [{ "element.ID_Chapitre": req.body.ID_Chapitre }], upsert: true },
        (err, docs) => {
            if (!err) {
                console.log('pas derreur');
                return res.status(200).json({ message: ' Modification du chapitre effectuer ' });

            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).send({ error: err });
            }
        }
    )
};
module.exports.ModifiChapitreThemeHistoire = async (req, res) => {
    Histoire.findOneAndUpdate(
        { IdHistoire: req.body.IdHistoire },
        { $set: { "Chapitres.$[element].Theme": req.body.Theme } },
        { arrayFilters: [{ "element.ID_Chapitre": req.body.ID_Chapitre }], upsert: true },
        (err, docs) => {
            if (!err) {
                console.log('pas derreur');
                return res.status(200).json({ message: ' Modification du chapitre effectuer ' });

            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).send({ error: err });
            }
        }
    )
};

// la modification des images implique quelques trucs sur le serveurs pour supprimer les anciennes images 

/*
module.exports.ModifiChapitreImageHistoire = async (req, res) => {
    Histoire.findOneAndUpdate(
        { IdHistoire: req.body.IdHistoire },
        { $set: { "Chapitres.$[element].Image": req.body.Image } },
        { arrayFilters: [{ "element.ID_Chapitre": req.body.ID_Chapitre }], upsert: true },
        (err, docs) => {
            if (!err) {
                console.log('pas derreur');
                return res.status(200).json({ message: ' Modification du chapitre effectuer ' });

            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).send({ error: err });
            }
        }
    )
};
*/
module.exports.ModifiChapitreDescriptionHistoire = async (req, res) => {
    Histoire.findOneAndUpdate(
        { IdHistoire: req.body.IdHistoire },
        { $set: { "Chapitres.$[element].Description": req.body.Description } },
        { arrayFilters: [{ "element.ID_Chapitre": req.body.ID_Chapitre }], upsert: true },
        (err, docs) => {
            if (!err) {
                console.log('pas derreur');
                return res.status(200).json({ message: ' Modification du chapitre effectuer ' });

            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).send({ error: err });
            }
        }
    )
};
module.exports.ModifiChapitreAjoutChallengesHistoire = async (req, res) => {
    Histoire.findOneAndUpdate(
        { IdHistoire: req.body.IdHistoire },
        { $addToSet: { "Chapitres.$[element].Challenges": req.body.NewChallenge } },
        { arrayFilters: [{ "element.ID_Chapitre": req.body.ID_Chapitre }], upsert: true },
        (err, docs) => {
            if (!err) {
                console.log('pas derreur');
                return res.status(200).json({ message: ' Modification du challenge du chapitre effectuer avec succés' });

            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).send({ error: err });
            }
        }
    )
};


module.exports.SupprimeHistoire = async (req, res) => {
    try {

        await Histoire.remove({ IdHistoire: req.body.IdHistoire }).exec();
        res.status(200).json({ message: "Suppression effectuer avec succes. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};