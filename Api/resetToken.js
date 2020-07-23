const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const Establishement = require("./../Models/EtablisementSchema");
const ResetToken = require("./../Models/resetTokenSchema");
const {
  getCollection,
  getCollectinById,
  updateCollection,
} = require("./collection");
module.exports = {
    async ResetPassword(req, res) {
      if (!req.body.email) {
        return res.status(500).json({ message: "Email is required" });
      }
      const etablisementGet = await getCollection(req);
      const candidat = await etablisementGet.findOne({
        email: req.body.email,
      });
      if (!candidat) {
        return res.status(409).json({ message: "Email does not exist" });
      }
  
      const resetToken = new ResetToken({
        resetToken: crypto.randomBytes(16).toString("hex"),
        code: Math.floor(Math.random() * 10000),
      });
      const userUpd = await updateCollection(req, resetToken);
      resetToken.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        userUpd.findOneAndUpdate(
          { email: req.body.email },
          { resetToken: resetToken._id }
        );
        // ResetToken.find({
        //   _id: resetToken._id,
        //   resetToken: { $ne: resetToken.resetToken },
        // })
        //   .remove()
        //   .exec();
        res.status(200).send({
          message: "Reset Password successfully.",
          token: resetToken.resetToken,
        });
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            candidat: "crmproject.2020@gmail.com",
            pass: "123456789crm",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        const mailOptions = {
          to: candidat.email,
          from: "crmproject.2020@gmail.com",
          subject: "Node.js Password Reset",
          text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
            Please copy this code ${resetToken.code}
            If you did not request this, please ignore this email and your password will remain unchanged.`,
        };
        transporter.sendMail(mailOptions, (err, info) => {});
      });
    },}