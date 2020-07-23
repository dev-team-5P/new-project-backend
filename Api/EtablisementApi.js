const express = require('express');
const bycrpt = require('bcryptjs');
const Etablisement = require('./../Models/EtablisementSchema');

const router = express.Router()

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

module.exports = router