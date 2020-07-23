const express = require('express');
const bycrpt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Etablisement = require('./../Models/EtablisementSchema');
const Condidat = require('./../Models/CondidatSchema');
const SuperAdmin = require('./../Models/superAdminSchema');

const router = express.Router();

router.post('', async(req,res)=>{
    const etablisement = await Etablisement.findOne({email: req.body.email});
    const condidat = await Condidat.findOne({email: req.body.email});
    const superAdmin = await SuperAdmin.findOne({email: req.body.email});

    const ValidEmailEtablisement = etablisement ? etablisement.email : undefined;
    const ValidEmailCondidat = condidat ? condidat.email : undefined;
    const ValidEmailSperAdmin = superAdmin ? superAdmin.email : undefined;


    if (ValidEmailEtablisement || ValidEmailCondidat || ValidEmailSperAdmin ) {
        if (etablisement) {
            const validpassetab = await bycrpt.compare(req.body.password,etablisement.password);
            if (!validpassetab) {
                return res.status(401).send({ message: "wrong email or password" }); // verification validité password etablisement//
            } else {
                let token = jwt.sign({
                    data: etablisement 
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
                    data:condidat
                 
                },
                "secret");
                res.send({ message: token, role:'Condidat' });
              }
        } else if(superAdmin) {
            const validPassSuperAdmin = await bycrpt.compare(
                req.body.password,
                superAdmin.password
              );
              if (!validPassSuperAdmin) {
                return res.status(401).send({ message: "wrong email or password" }); // verification validité password superAdmin//   
              } else {
                let token = jwt.sign({
                    data:superAdmin
                   
                },
                "secret");
                res.send({ message: token, role:'SuperAdmin' });
              }
        }   
    } else {
     return res.status(401).send({ message: "wrong email or password" });
        
    }
})

module.exports = router;