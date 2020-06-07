const passport = require('passport');
const passportJWT = require('passport-jwt');
const { UserRepository } = require('../repositories');

const { ExtractJwt, Strategy } = passportJWT;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new Strategy(jwtOptions, async (jwtPayload, next) => {
  // Token expiry validation is already validated using passport-jwt,
  const { id } = jwtPayload;
  const user = await UserRepository.find({ _id: id }, { multiple: false });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

const isAuthenticated = passport.authenticate('jwt', { session: false });

passport.use(strategy);

module.exports = {
  passport,
  isAuthenticated,
};
