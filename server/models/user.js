'use strict';

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
}, {
  versionKey: false,
  timestamps: true,
});

export default mongoose.model('User', userSchema);
