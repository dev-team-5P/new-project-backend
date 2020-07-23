const mongoose = require('mongoose');

const Etablisement = new mongoose.Schema({
    nom : {type:String ,required:true},
    adresse : {type:String ,required:true},
    téléphone : {type:String ,required:true},
    fax : {type:String ,required:true},
    email : {type:String ,required:true},
    password : {type:String ,required:true},
    logo: String,
    role: { type: String, default: "etablisement" },

});

module.exports =mongoose.model('Etablisement', Etablisement);