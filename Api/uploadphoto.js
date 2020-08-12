const router = require("express").Router();
const process = require("process");
const multer = require("multer");
const Etablisement = require('./../Models/EtablisementSchema');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + "/upload");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now().toString() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});
const upload = multer({ storage: storage });
router.put(
  "/:id",
//   passport.authenticate("bearer", { session: false }),
  upload.single("image"),
  (req, res) => {
    if (!req.file) return res.send({ message: "no image uploaded" });
    else {
      const link = "http://localhost:3000/upload/" + req.file.filename;
      return Etablisement.findByIdAndUpdate(
        req.params.id,
        { $set: { logo: link } },
        (err, resultat) => {
          if (err) {
            res.send(err);
          }
             Etablisement.findById(req.params.id,(err,resultat2)=>{
                    res.send(resultat2);
                    console.log(resultat2);
                });
        }
      );
    }
  }
);
module.exports = router;
