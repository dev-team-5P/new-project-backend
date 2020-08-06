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
/*****change password ******** */
router.put('/changepass/:id',
passport.authenticate("bearer", { session: false}),
 async(req,res)=>{
    // const superAdmin = await SuperAdmin.findById(req.user.etablisement._id);
   await bycrypt.compare(req.body.oldpass , req.user.superadmin.password).then((oldpass)=>
    {
        console.log(req.user);
        console.log(oldpass);
        if (oldpass) {
            const salt =  bycrypt.genSalt(10).then((salt) => {
                bycrypt.hash(req.body.newpass, salt).then((newpass)=>{
                    SuperAdmin.findByIdAndUpdate(req.params.id, {password:newpass}  , (err,resultat)=>{
                        if (err) { res.send("mamchach") }
                        res.send(resultat)
                    });
                })
            })
        } else {res.send({message:"you old pass invalid"})  }
    })
})
/**************get etablisement for super admin ****** */
router.get('/getetablisement',

async(req,res)=>{
    const alletab = await Etablisement.find();
    res.send(alletab);
})
/************Delete etablisement for super admin ******* */
router.delete('/deleteetab/:id' ,
passport.authenticate("bearer",{ session: false}),
async(req,res)=>{
    await Etablisement.findByIdAndDelete(req.params.id);
    res.send({ message: "Etablisement Deleted" });    
})
// api get etab par id  //
router.get( "/:id",
    passport.authenticate("bearer", { session: false }),
 async (req, res) => {
 const etablisement = await Etablisement.findById(req.params.id);
 res.send(etablisement);
 });
module.exports = router;