'use strict';

import mongoose from 'mongoose';
import uuid from 'uuid';
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
    default: uuid.v4(),
  },
  secret: {
    type: String,
    required: true,
    default: uuid.v4(),
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

export default mongoose.model('Client', clientSchema);
