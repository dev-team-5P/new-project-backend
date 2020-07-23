const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const Admin = require("./Models/superAdminSchema");
// const User = require("./models/userSchema");
const jwt = require("jsonwebtoken");

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, "secret", (err, decoded) => {
      Admin.findOne({ _id: decoded.data._id }, (err, admin) => {
        if (!admin) {
          return done(null, false);
        }
        if (err) {
          return done(null, false);
        }
        return done(null, { admin });
      });
    });
  })
);



passport.use(
  new BearerStrategy(async (token, done) => {
    const tokenData = await jwt.verify(token, "secret");
    console.log(tokenData);
    const etablisement = await Etablisement.findOne({ _id: tokenData.data._id });
    const condidat = await Condidat.findOne({ _id: tokenData.data._id });
    const superadmin = await SuperAdmin.findOne({ _id: tokenData.data._id });
    console.log(superadmin);
    if (etablisement) {
      return done(null, { etablisement });
  } else if (condidat) {
     return done(null, { condidat });
    }   else if (superadmin) {
      return done(null, { superadmin });  
    } 
  })
);
