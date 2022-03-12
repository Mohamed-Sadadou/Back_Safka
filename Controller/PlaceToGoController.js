
const PlaceToGO = require("../Models/PlaceToGo");
const Localisation = require("../Models/Localisation");
const CodifiIdPlace = () => {
    return ['Place', Math.floor(Math.random() * 10000)].join('_');
};

module.exports.AjoutPlaceToGo = async (req, res) => {
    Links = [];
    await req.files.forEach(function (y) {
        Links.push(y.path);
    });

    const ID_PlaceToGO = CodifiIdPlace();
    const {
        Localisation, Description, Categorie
    } = req.body;


    const Place = new PlaceToGO({
        ID_PlaceToGO,
        Localisation,
        Images: Links,
        Description,
        Categorie
    });
    Place.save()
        .then(() => res.status(201).json({ message: 'Place créé !' }))
        .catch(error => res.status(400).json({ error }));
};
module.exports.ModifierLocalisation = async (req, res) => {
    console.log("ca ",req.body)
    const {
        Langitude, Latitude
    } = req.body;
    let Local =
    {
        Langitude, Latitude
    }
    try {
        await PlaceToGO.findOneAndUpdate(
            { ID_PlaceToGO: req.body.ID_PlaceToGO },
            { $set: { Localisation: Local } },
            { new: false, upsert: true, setDefaultsOnInsert: true }
        ).then((docs)=> res.status(200).json({ message: 'modifié !' }))
        .catch((err)=>console.log("---- erreur ----"))
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
module.exports.ModifierDescription = async (req, res) => {

    try {
        await PlaceToGO.findOneAndUpdate(
            { ID_PlaceToGO: req.body.ID_PlaceToGO },
            { $set: { Description: req.body.Description } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).then((docs)=>{ console.log("---- ok ----"); return res.status(200).json(docs);})
        .catch((err)=>{return res.status(500).send({ message: err });})
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
module.exports.GetPlace = (req, res) => {
    PlaceToGO.find({ ID_PlaceToGO: req.body.ID_PlaceToGO }, (err, docs) => {
        if (!err) res.status(200).json(docs);
        else console.log(' on a un souci : ' + err);
    });
};
module.exports.GetAllPlaces = async (req, res) => {
    const Place = await PlaceToGO.find();
    res.status(200).json(Place);
};