  
var mongoose = require('mongoose');

var privateChat = new mongoose.Schema({
    candidat1:{type: mongoose.Schema.Types.ObjectId, ref: 'Condidat'},
    candidat2:{type: mongoose.Schema.Types.ObjectId, ref: 'Condidat'},
    messages:[ {
        content: String,
        logo : String,
        candidat: {type: mongoose.Schema.Types.ObjectId, ref: 'Condidat'},
        name : {type: String ,default :""},
        createdDate: {type: Date, default: Date.now()}
}]
});

module.exports = mongoose.model('privateChat', privateChat);