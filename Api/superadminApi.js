const express = require('express');
const bycrypt = require('bcryptjs');
const SuperAdmin = require('./../Models/superAdminSchema');

const router = express.Router();
    router.post('/register', async(req,res)=>{
    const superAdmin = SuperAdmin(req.body);
    const uniquesuperAdmin = await SuperAdmin.findOne({email: req.body.email});
    if (uniquesuperAdmin) {
        return res.status(400).send({ message: "email already in use" });
    } else {
        const salt = await bycrypt.genSalt(10);
        superAdmin.password = await bycrypt.hash(superAdmin.password, salt);
        await superAdmin.save();
        res.send(superAdmin);
    }

    })

module.exports = router;

