const express = require('express');
const bycrypt = require('bcryptjs');
const Condidat = require('./../Models/CondidatSchema');
const Etablisement = require('./../Models/EtablisementSchema');
const passport = require('passport');

const router = express.Router();
/************Register Condidat ********* */
router.post('/:id/register', async (req, res) => {
    const condidat = new Condidat(req.body);
    const etablisement = await Etablisement.findById(req.params.id);
    if (!etablisement) {
        return res.status(400).send({
            message: "Etablisement does not exist",
        });
    } else {
        const uniquecondidat = await Condidat.findOne({ email: req.body.email }); // verification email unique
        if (uniquecondidat) {
            return res.status(400).send({ message: "email already in use" });
        } else {
            const salt = await bycrypt.genSalt(10);
            condidat.password = await bycrypt.hash(condidat.password, salt);
            await condidat.save();
            await Condidat.findByIdAndUpdate(condidat._id, { etablisement: etablisement._id })
            res.send(condidat);
        }
    }
});
/*************parametrage de compte for condidat ******** */
router.put('/Parametrage/:id', 
passport.authenticate("bearer", { session: false }),
(req,res)=>{
    
    Condidat.findByIdAndUpdate(req.params.id,req.body,(err,resultat)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(resultat);
        }
    })
})
router.get('/getListeCandidat/:id',function (req,res){    
    Condidat.find({etablisement: req.params.id}, function(err,users){
            if(err){
                res.send(err)
            } else {
                res.send(users);
            }
})
});
/**************get etablisement for candidate ****** */
router.get('/etablisement', async(req,res)=>{
    const alletab = await Etablisement.find();
    res.send(alletab);
})

module.exports = router