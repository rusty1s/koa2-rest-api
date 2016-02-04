'use strict';

import mongoose from 'mongoose';
import idValidator from 'mongoose-id-validator';
import { encrypt } from '../helpers/crypt';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  hashedSecret: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

clientSchema.plugin(idValidator);

clientSchema.virtual('secret')
  .set(function setSecret(value) { this._secret = value; })
  .get(function getSecret() { return this._secret; });

clientSchema.pre('save', async function preSave(next) {
  if (!this.secret) return next();

  try {
    this.hashedSecret = await encrypt(this.secret);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('Client', clientSchema);
