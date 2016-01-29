'use strict';

export default function (sequelize, DataTypes) {
  return sequelize.define('User', {
    username: DataTypes.STRING,
  });
}
