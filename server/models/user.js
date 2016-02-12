'use strict';

import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import bcrypt from 'bcrypt-as-promised';
import * as provider from '../auth/provider';

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
      message: 'is not valid',
    }),
  },
  hashed_password: {
    type: String,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  provider: {
    type: String,
    required: true,
    enum: ['local', ...Object.keys(provider)],
    default: 'local',
  },
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.hashed_password;
    },
  },
});

userSchema.virtual('password')
  .set(function setPassword(value) { this._password = value; })
  .get(function getPassword() { return this._password; });

userSchema.pre('save', async function preSave(next) {
  if (!this.password) return next();

  try {
    this.hashed_password = await bcrypt.hash(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('User', userSchema);
