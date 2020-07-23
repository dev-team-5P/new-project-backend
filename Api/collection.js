const Etablisement = require("./../Models/EtablisementSchema");
const Candidat = require("../Models/CondidatSchema");

module.exports = {
  async getCollection(req) {
    const etablisement = await Etablisement.findOne({ email: req.body.email });
    const candidat = await Candidat.findOne({ email: req.body.email });

    if (etablisement) return etablisement;
    else if (candidat) return candidat;
  },
  async getCollectinById(candidatToken) {
    const establishementId = await Etablisement.findOne({ resetToken: etablismentToken._id });
    const candidatId = await candidat.findOne({ resetToken: candidatToken._id });
    if (establishementId) return etablisement;
    else if (candidatId) return candidat;
  },
  async updateCollection(req, resetToken) {
    const establishementId = await Etablisement.findOneAndUpdate(
      { email: req.body.email },
      { resetToken: resetToken._id }
    );
    const candidatId = await Candidat.findOneAndUpdate(
      { email: req.body.email },
      { resetToken: resetToken._id }
    );
    if (establishementId) return etablisement;
    else if (candidatId) return candidat;
  },
};