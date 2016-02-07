'use strict';

import mongoose from 'mongoose';
import idValidator from 'mongoose-id-validator';

const accessTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
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
    required: true,
  },
  created_at: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
}, {
  versionKey: false,
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
    },
  },
});

accessTokenSchema.plugin(idValidator);

export default mongoose.model('AccessToken', accessTokenSchema);
