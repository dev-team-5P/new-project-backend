const express = require('express');
const bycrpt = require('bcryptjs');
const Admin = require("./../Models/superAdminSchema");
const Etablisement = require('./../Models/EtablisementSchema');
// const passport = require('./../passport');
const passport = require('passport')
const router = express.Router()
/***************Register de l'etablisement ********** */
router.post('/register',async(req,res)=>{
    const etablisement = Etablisement(req.body);
    const uniqueetablisement = await Etablisement.findOne({email: req.body.email});

    if (uniqueetablisement) {
        return res.status(400).send({ message: "email already in use" });
    } else {
        const salt = await bycrpt.genSalt(10);
        etablisement.password = await bycrpt.hash(etablisement.password, salt);
        await etablisement.save();
        res.send(etablisement);
    }
});
/************Parametrage de compte for l'etablisement ************ */
router.put('/Parametrage/:id', 
passport.authenticate("bearer", { session: false }),
(req,res)=>{
    Etablisement.findByIdAndUpdate(req.params.id,req.body,(err,resultat)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(resultat);
        }
    })
})
/***********************update etablisement four superadmin *** */
router.put('/updatesuper/:id', 
(req,res)=>{
    Etablisement.findByIdAndUpdate(req.params.id,req.body,(err,resultat)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(resultat);
        }
    })
})


module.exports = router