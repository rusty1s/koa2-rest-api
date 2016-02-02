'use strict';

import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import bcrypt from 'bcrypt-as-promised';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    validate: validate({
      validator: 'isEmail',
      message: 'Email address is not valid',
    }),
  },
  hashedPassword: {
    type: String,
  },
}, {
  versionKey: false,
  timestamps: true,
});

userSchema
  .virtual('password')
  .set(function setPassword(value) { this._password = value; })
  .get(function getPassword() { return this._password; });

userSchema
  .pre('save', async function preSave(next) {
    if (!this.password) return next();

    try {
      const salt = await bcrypt.genSalt(10);
      this.hashedPassword = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

userSchema.methods = {
  async verifyPassword(password) {
    if (!this.hashedPassword) return false;

    return await bcrypt.compare(password, this.hashedPassword);
  },
};

export default mongoose.model('User', userSchema);
