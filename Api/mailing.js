const nodemailer = require("nodemailer");
const router  = require ("express").Router();
const passport = require('passport');

const candidat = require("./../Models/CondidatSchema");
  
router.post("/",  passport.authenticate("bearer", { session: false }),(req,res)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "crmproject.2020@gmail.com",
          pass: "123456789crm",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
candidat.find().then((candidats)=>{
    candidats.forEach((candidat)=>{
        const mailOptions = {
            to: candidat.email,
            from: req.user.etablisement.email,
            subject: req.body.subject,
            text: req.body.content,
          };
          transporter.sendMail(mailOptions, (err, info) => {
              if (err){
                  console.log(err);
              }
          });

    });
res.send({message : 'mailing sended successfully'});

});
    

});
module.exports = router;