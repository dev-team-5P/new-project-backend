const express = require('express');
const bycrypt = require('bcryptjs');
const SuperAdmin = require('./../Models/superAdminSchema');
const Etablisement = require('./../Models/EtablisementSchema');
const passport = require('passport');

const router = express.Router();
/***************register super admin **** */
router.post('/register', async (req, res) => {
    const superAdmin = SuperAdmin(req.body);
    const uniquesuperAdmin = await SuperAdmin.findOne({ email: req.body.email });
    if (uniquesuperAdmin) {
        return res.status(400).send({ message: "email already in use" });
    } else {
        const salt = await bycrypt.genSalt(10);
        superAdmin.password = await bycrypt.hash(superAdmin.password, salt);
        await superAdmin.save();
        res.send(superAdmin);
    }
})
/************Parametrage de compte for Super Admin ************ */
router.put('/Parametrage/:id', 
passport.authenticate("bearer", { session: false }),
(req,res)=>{
    SuperAdmin.findByIdAndUpdate(req.params.id , req.body, (err,resultat)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(resultat);
        }
    })
})
/**************get etablisement for super admin ****** */
router.get('/getetablisement', passport.authenticate("bearer",{ session: false}),
async(req,res)=>{
    const alletab = await Etablisement.find();
    res.status(401).send(alletab);
})
module.exports = router;

