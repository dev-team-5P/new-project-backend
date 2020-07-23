const express = require('express');
const bycrpt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Etablisement = require('./../Models/EtablisementSchema');
const Condidat = require('./../Models/CondidatSchema');


const router = express.Router();

router.post('', async(req,res)=>{
    const etablisement = await Etablisement.findOne({email: req.body.email});
    const condidat = await Condidat.findOne({email: req.body.email});

    const ValidEmailEtablisement = etablisement ? etablisement.email : undefined;
    const ValidEmailCondidat = condidat ? condidat.email : undefined;

    if (ValidEmailEtablisement || ValidEmailCondidat) {
        if (etablisement) {
            const validpassetab = await bycrpt.compare(req.body.password,etablisement.password);
            if (!validpassetab) {
                return res.status(401).send({ message: "wrong email or password" }); // verification validité password etablisement//
            } else {
                let token = jwt.sign({
                    data:{
                        etablisement: etablisement
                    },
                },
                "secret");
                res.send({ message: token, role:'Etablisement' });
            }
        } else if (condidat) {
            const validPassCondidat = await bycrpt.compare(
                req.body.password,
                condidat.password
              );
              if (!validPassCondidat) {
                return res.status(401).send({ message: "wrong email or password" }); // verification validité password condidat//   
              } else {
                let token = jwt.sign({
                    data:{
                        condidat: condidat
                    },
                },
                "secret");
                res.send({ message: token, role:'Condidat' });
              }
        } 
    } else {
     return res.status(401).send({ message: "wrong email or password" });
        
    }
})

module.exports = router;