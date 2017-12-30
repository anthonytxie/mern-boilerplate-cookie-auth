require('dotenv').config();
const User = require('../db/models/User.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt-as-promised');

const localOptions = { usernameField: 'email' };

passport.use(
  new LocalStrategy(localOptions, async function(email, password, done) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        done(null, false, {
          message: 'invalid email or password',
        });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          done(null, user);
        } else {
          done(null, false);
        }
      }
    } catch (e) {
      done(null, false, { message: 'invalid email or password' });
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientId,
      clientSecret: process.env.googleClientSecret,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.createOAuthUser('google', profile.id);
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); //passing user.id to done to serialize
});

passport.deserializeUser((userId, done) => {
  User.findById(userId).then(user => {
    done(null, user); //passing deserialized user object to done
  });
});
