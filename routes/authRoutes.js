const express = require('express');
const passport = require('passport');
const authRouter = express();
const User = require('../db/models/User.js');

//=============OAUTH ROUTES========================//
authRouter.get(
  '/api/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

authRouter.get(
  '/api/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/surveys');
  }
);

//=============LOCAL AUTH ROUTES========================//

authRouter.post('/api/auth/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message });
    }
    res.json(user);
  })(req, res, next);
});

authRouter.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOrCreate('local', { email, password });
    res.send(user);
  } catch (e) {
    if (e.errmsg.includes('duplicate')) {
      res.send('this e-mail is already being used');
    }
  }
});

//=============USER ROUTES========================//

authRouter.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

authRouter.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;
