const mongoose = require('mongoose');

const Condidat = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    adresse: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "condidat" },
    etablisement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Etablisement"
    },
    resetToken: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RestToken",
      }
});

module.exports = mongoose.model('Condidat', Condidat);