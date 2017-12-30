const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-as-promised');

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  createdDate: { type: Date, default: Date.now() },
});

userSchema.statics.findOrCreate = async function(strategy, authDetails) {
  switch (strategy) {
    case 'google':
      const googleUser = await this.findOne({ googleId: authDetails.oauthId });
      if (!googleUser) {
        return new User({ googleId: authDetails.oauthId }).save();
      } else {
        return googleUser;
      }
    case 'facebook':
      const facebookUser = await this.findOne({
        facebookId: authDetails.oauthId,
      });
      if (!facebookUser) {
        return new User({ facebookId: authDetails.oauthId }).save();
      } else {
        return facebookUser;
      }
    case 'local':
      const localUser = await this.findOne({
        email: authDetails.email,
        password: authDetails.password,
      });
      if (!localUser) {
        return new User({
          email: authDetails.email,
          password: authDetails.password,
        }).save();
      } else {
        return localUser;
      }
    default:
      return '';
  }
};

userSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (e) {
    next(e);
  }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
