const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema, model } = mongoose;
const SALT_ROUNDS = 10;

const userSchema = new Schema(
  {
    displayName: String,
    username: String,
    password: String,
  },
  { timestamps: true }
);

userSchema.pre('save', async function _(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function _(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.hideSensitiveInfo = function _(props = ['password']) {
  const plainUser = this.toObject({ versionKey: false });

  for (const prop of props) delete plainUser[prop];
  return plainUser;
};

userSchema.methods.authenticate = function authenticate() {
  const plainUser = this.hideSensitiveInfo();
  const payload = { id: plainUser._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '14d' });
  return { user: plainUser, token };
};

const User = model('User', userSchema);

module.exports = User;
