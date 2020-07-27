  
var mongoose = require('mongoose');

var privateChat = new mongoose.Schema({
    candidat1:{type: mongoose.Schema.Types.ObjectId, ref: 'candidat'},
    candidat2:{type: mongoose.Schema.Types.ObjectId, ref: 'candidat'},
    messages:[ {
        content: String,
        candidat: {type: mongoose.Schema.Types.ObjectId, ref: 'candidat'},
        createdDate: {type: Date, default: Date.now()}
}]
});

module.exports = mongoose.model('privateChat', privateChat);