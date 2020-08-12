const express = require('express');
const bycrpt = require('bcryptjs');
const Etablisement = require('./../Models/EtablisementSchema');
const Condidat = require('./../Models/CondidatSchema');
const resetToken = require("./../Models/resetTokenSchema");
// const passport = require('./../passport');
const passport = require('passport');
const { findOne } = require('./../Models/EtablisementSchema');
const router = express.Router()
/***************Register de l'etablisement ********** */
router.post('/register', async (req, res) => {
    const etablisement = Etablisement(req.body);
    const uniqueetablisement = await Etablisement.findOne({ email: req.body.email });

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
    (req, res) => {
        Etablisement.findByIdAndUpdate(req.params.id, req.body, (err, resultat) => {
            if (err) {
                res.send(err);
            } else {
                Etablisement.findById(req.params.id,(err,resultat2)=>{
                    res.send(resultat2);
                    // console.log(resultat2);
                })
            }
        })
    })
    /*******change pass etab ********** */
    router.put('/changepass/:id',
passport.authenticate("bearer", { session: false}),
 async(req,res)=>{
    // const superAdmin = await SuperAdmin.findById(req.user.etablisement._id);
   await bycrpt.compare(req.body.oldpass , req.user.etablisement.password).then((oldpass)=>
    {
        console.log(req.user);
        console.log(oldpass);
        if (oldpass) {
            const salt =  bycrpt.genSalt(10).then((salt) => {
                bycrpt.hash(req.body.newpass, salt).then((newpass)=>{
                    Etablisement.findByIdAndUpdate(req.params.id, {password:newpass}  , (err,resultat)=>{
                        if (err) { res.send("mamchach") }
                        res.send(resultat)
                    });
                })
            })
        } else {res.send({message:"you old pass invalid"})  }
    })
})
/***********************update etablisement four superadmin *** */
router.put('/updatesuper/:id',
    (req, res) => {
        Etablisement.findByIdAndUpdate(req.params.id, req.body, (err, resultat) => {
            if (err) {
                res.send(err);
            } else {
                res.send(resultat);
            }
        })
    })
/***************create condidat for etaablisement ** */
router.post('/ajoucondidat',
    passport.authenticate("bearer", { session: false }),
    async (req, res) => {
        const etablisement = await Etablisement.findById(req.user.etablisement._id);
        const uniquecondidat = await Condidat.findOne({ email: req.body.email }); // verification email unique
        if (!etablisement) return res.send({ message: "Unauthorized" });
        if (uniquecondidat) {
            return res.status(400).send({ message: "email already in use" });
        } else {
            const condidat = await Condidat(req.body);
            const salt = await bycrpt.genSalt(10);
            condidat.password = await bycrpt.hash(condidat.password, salt);
            await condidat.save();
            await Condidat.findByIdAndUpdate(condidat._id, { etablisement: etablisement._id });
            res.send(condidat);
        }


    })
/********* read condida for etablisement ******** */
router.get('/getcondidat',
    passport.authenticate("bearer", { session: false }),
    async (req, res) => {
        const getcondidat = await Condidat.find({ etablisement: req.user.etablisement._id });
        res.send(getcondidat)
    });

router.get("/:id",
    passport.authenticate("bearer", { session: false }),
    async (req, res) => {
        const condidat = await Condidat.findById(req.params.id);
        // if (err) {
        //   res.send(err);
        // } else {
        res.send(condidat);
        // }
    });
// }
//   );
/**************update condidat for etablisement**********/
router.put('/updatecondidat/:id',
    passport.authenticate("bearer", { session: false }),
    async (req, res) => {
        const etablisement = await Etablisement.findById(req.user.etablisement._id);
        if (!etablisement) return res.send({ message: "Unauthorized" });
        const condidat = req.body;
        const con = await Condidat.findByIdAndUpdate(req.params.id, condidat);
        res.send(con)
    })
/************delete condidat for etablisement ***** */
router.delete('/delete/:id',
    passport.authenticate("bearer", { session: false }),
    async (req, res) => {
        const etablisement = await Etablisement.findById(req.user.etablisement._id);
        if (!etablisement) return res.send({ message: "Unauthorized" });
        await Condidat.findByIdAndDelete(req.params.id);
        res.send({ message: 'User Deleted' })
    });
    


module.exports = router