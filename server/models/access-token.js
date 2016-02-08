'use strict';

import mongoose from 'mongoose';
import uid from 'uid';
import idValidator from 'mongoose-id-validator';

const duration = 3600;

const accessTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
    default: uid(194),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  created_at: {
    type: Date,
    expires: duration,
    default: Date.now(),
  },
}, {
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.user;
      delete ret.client;
      delete ret.id;
    },
  },
});

accessTokenSchema.virtual('expires_in')
  .get(function getExpiresIn() {
    const expirationTime = this.created_at.getTime() + (duration * 1000);
    return parseInt((expirationTime - Date.now()) / 1000, 10);
  });

accessTokenSchema.plugin(idValidator);

export default mongoose.model('AccessToken', accessTokenSchema);
