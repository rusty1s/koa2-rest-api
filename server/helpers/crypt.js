'use strict';

import bcrypt from 'bcrypt';

export function encrypt(value) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(value, 10, (err, hash) => {
      if (err) reject(err);
			else resolve(hash);
    });
  });
}

export function verifyHash(hash, value) {
  return new Promise((resolve, reject) => {
    if (!hash) resolve(false);

    bcrypt.compare(value, hash, (err, isMatch) => {
      if (err) reject(err);
      else resolve(isMatch);
    });
  });
}
