'use strict';

import mongoose from 'mongoose';
import uid from 'uid';
import idValidator from 'mongoose-id-validator';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  id: {
    type: String,
    unique: true,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  grant_type: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
      delete ret.hashed_secret;
    },
  },
});

clientSchema.plugin(idValidator);

clientSchema.pre('validate', function preSave(next) {
  if (this.isNew) {
    if (!this.id) this.id = uid(16);
    if (!this.id) this.secret = uid(32);
  }
  next();
});

export default mongoose.model('Client', clientSchema);

