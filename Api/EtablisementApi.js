const express = require('express');
const bycrpt = require('bcryptjs');
const passport = require("passport");
const Admin = require("./../Models/superAdminSchema");
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
// api getAll etabliissement   //
router.get(
    "/get",
  // passport.authenticate("bearer", { session: false }),
    async (req, res) => {
    //   const superAdmin = await Admin.findOne({
    //     _id: req.user.admin._id,
    //     role: "superAdmin",
    //   });
  
      if (!superAdmin) return res.send({ message: "Unauthorized" });
  
      const pageSize = +req.query.pagesize;
      const currentPage = +req.query.page;
      const etabQwery = Etablisement.find();
  
      if (pageSize && currentPage) {
        etabQwery.skip(pageSize * (currentPage - 1)).limit(pageSize);
      }
      const etablisement = await etabQwery;
      const EtabCount = await Etablisement.countDocuments();
      res.send({ etablisement: etablisement, count: EtabCount });
    }
  );

module.exports = router