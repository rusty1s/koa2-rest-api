'use strict';

export default (sequelize, DataTypes) => {
  return sequelize.define('User', {
    username: DataTypes.STRING,
  });
};
