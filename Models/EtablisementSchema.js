const mongoose = require('mongoose');

const Etablisement = new mongoose.Schema({
    nom : {type:String ,required:true},
    adresse : {type:String ,required:true},
    telephone : {type:String ,required:true},
    fax : {type:String ,required:true},
    email : {type:String ,required:true},
    password : {type:String ,required:true},
    logo: String,
    role: { type: String, default: "etablisement" },
 admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    resetToken: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RestToken",
    }
});

module.exports =mongoose.model('Etablisement', Etablisement);