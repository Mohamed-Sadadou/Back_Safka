const Challenge = require("../Models/Challenge");
const User = require("../Models/Utilisateur.Model");
const Mission = require("../Models/Mission");
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
module.exports.CreateChallenge = async (req, res) => {

    const Id_Challenge= CodifiIdChallenge();
    const Day =  createdate();
    const Chal=  new Challenge({
        Id_Challenge,
        Missions: req.body.Missions,
        Day
    });
    Chal.save()
        .then(() => res.status(201).json({ message: 'Challenge créé !' }))
        .catch(error => res.status(400).json({ error }));


};
module.exports.GetAllChallenges = async (req,res)=>{
    const Challenges = await Challenge.find();
    res.status(200).json(Challenges);
};
module.exports.GetChallenge = async (req, res) => {
    Challenge.find({Id_Challenge:req.body.Id_Challenge}, (err, docs) => {
        if (!err) res.status(200).json(docs);
        else console.log(' on a un souci : ' + err);
    });
};
module.exports.AjoutMission = async(req,res)=>{
    try {
        await Challenge.findOneAndUpdate(
            { Id_Challenge: req.body.Id_Challenge },
            { $addToSet: { Missions: req.body.Mission } },
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
module.exports.ModifierPlaceToGo = async(req,res)=>{
    
    Challenge.findOneAndUpdate(
        { Id_Challenge: req.body.Id_Challenge },
        { $pull: { Missions: { Id_mission: req.body.Id_mission  } } },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
            if (!err) {
                console.log('pas derreur');
            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).json({ error: err });
            }
        }
    );
    const miss = new Mission({
        Id_mission:req.body.Id_mission,
        PlaceToGO:req.body.PlaceToGO,
    });
    Challenge.findOneAndUpdate(
        { Id_Challenge: req.body.Id_Challenge  },
        { $addToSet: { Missions: miss } },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
            if (!err) {
               
                console.log('pas derreur'); 
                return res.status(200).json({ message: 'modification effectué ' });

            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).send({ error: err });
            }
        }
    );

};
module.exports.DoneMission = async(req,res)=>{
    User.findOneAndUpdate(
        { id_User: req.body.id_User  },
        { $addToSet: { MissionsDone: req.body.Id_mission } },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
            if (!err) {
               
                console.log('pas derreur'); 
                return res.status(200).json({ message: 'modification effectué ' });

            } else {
                console.log('erreur de mise a jour : ', err);
                return res.status(202).send({ error: err });
            }
        }
    );
};
module.exports.AjoutGallery = async(req,res)=>{
Challenge.findOneAndUpdate(
    { Id_Challenge: req.body.Id_Challenge},
    { $addToSet: { "Missions.$[element].Gallery": req.body.Souvenir } },
    { arrayFilters: [ { "element.Id_mission": req.body.Id_mission } ], upsert: true },
    (err, docs) => {
        if (!err) {
            console.log('pas derreur'); 
            return res.status(200).json({ message: 'Ajout Gallery effectué ' });

        } else {
            console.log('erreur de mise a jour : ', err);
            return res.status(202).send({ error: err });
        }
    }
)
};
module.exports.RecupMission = async(req,res)=>{
    Challenge.find({Id_Challenge:req.body.Id_Challenge}, (err, docs) => {
        if (!err) res.status(200).json(docs.Missions);
        else console.log(' on a un souci : ' + err);
    });
};