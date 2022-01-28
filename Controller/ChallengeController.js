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
module.exports.GetChallenge = (req, res) => {
    Challenge.find({Id_Challenge:req.body.Id_Challenge}, (err, docs) => {
        if (!err) res.status(200).json(docs);
        else console.log(' on a un souci : ' + err);
    });
};