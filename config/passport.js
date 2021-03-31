var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/users");
const config = require("../config/database");

module.exports = function (passport) {
  let opts = {};
  // recieve 'Authorization' header with bearer
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.OPTSSECRET || config.secret;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.getUserById(jwt_payload.subject, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
