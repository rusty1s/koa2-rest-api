'use strict';

import provider from '../auth/config';

export default function user(sequelize, DataTypes) {
  return sequelize.define('User', {
    username:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, undefined],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    hashedPassword: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    provider: {
      type: DataTypes.STRING,
      validate: {
        isSupportedProvider(value) {
          if (~provider.indexOf(value)) {
            throw new Error('No supported provider!');
          }
        },
      },
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  });
}
