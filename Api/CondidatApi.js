const express = require('express');
const bycrypt = require('bcryptjs');
const Condidat = require('./../Models/CondidatSchema');
const Etablisement = require('./../Models/EtablisementSchema')

const router = express.Router();

router.post('/:id/register',async (req,res)=>{
    const condidat = new Condidat(req.body);
    const etablisement = await Etablisement.findById(req.params.id);
    if (!etablisement){
        return res.status(400).send({
            message: "Etablisement does not exist",
        });
    } else {
        const uniquecondidat = await Condidat.findOne({email: req.body.email}); // verification email unique
        if (uniquecondidat) {
            return res.status(400).send({ message: "email already in use" });
        } else {
            const salt = await bycrypt.genSalt(10);
            condidat.password = await bycrypt.hash(condidat.password,salt);
            await condidat.save();
            await Condidat.findByIdAndUpdate(condidat._id,{etablisement:etablisement._id})
            res.send(condidat);
        }
    }
});

module.exports = router