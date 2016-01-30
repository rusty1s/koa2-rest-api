'use strict';

import Sequelize from 'sequelize';
import requireDir from 'require-dir';
import config from './config';

const models = requireDir('../models');
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config);
const db = { sequelize, Sequelize };

// register models
Object.keys(models).forEach(name => {
  const model = sequelize.import(name, models[name].default);
  db[model.name] = model;
});

// register associations
Object.keys(db).forEach(name => {
  if (db[name].associate) db[name].associate(db);
});

export default db;
