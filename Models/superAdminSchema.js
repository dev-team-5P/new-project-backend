const mongoose = require('mongoose');

const superAdmin = new mongoose.Schema({
    name: { type:String , required:true},
    email: { type:String , required:true},
    password: { type:String , required:true},
    role: { type: String, default: "superAdmin" }
}); 

module.exports = mongoose.model('superadmin', superAdmin);