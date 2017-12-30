require('dotenv').config();
const { User } = require('../db/models/User.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id); //passing user.id to done to serialize
});

passport.deserializeUser((userId, done) => {
  User.findById(userId).then(user => {
    done(null, user); //passing deserialized user object to done
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientId,
      clientSecret: process.env.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.createOAuthUser('google', profile.id);
      done(null, user);
    }
  )
);
