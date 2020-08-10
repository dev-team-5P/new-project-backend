const Etablisement = require("./../Models/EtablisementSchema");
const candidat = require("../Models/CondidatSchema");

module.exports = {
  async getCollection(req) {
    const etablisement = await Etablisement.findOne({ email: req.body.email });
    const Candidat = await candidat.findOne({ email: req.body.email });

    if (etablisement) return Etablisement;
    else if (Candidat) return candidat;
  },
  async getCollectinById(candidatToken) {
    const establishementId = await Etablisement.findOne({ resetToken: candidatToken._id });
    const candidatId = await candidat.findOne({ resetToken: candidatToken._id });
    if (establishementId) return Etablisement;
    else if (candidatId) return candidat;
  },
  async updateCollection(req, resetToken) {
    const establishementId = await Etablisement.findOneAndUpdate(
      { email: req.body.email },
      { resetToken: resetToken._id }
    );
    const candidatId = await candidat.findOneAndUpdate(
      { email: req.body.email },
      { resetToken: resetToken._id }
    );
    if (establishementId) return Etablisement;
    else if (candidatId) return candidat;
  },
};