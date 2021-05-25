const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Destination = require('./destination')(sequelize, Sequelize);
db.Notice = require('./notice')(sequelize, Sequelize);
db.Faq = require('./faq')(sequelize, Sequelize);
db.Qna = require('./qna')(sequelize, Sequelize);
db.Banner = require('./banner')(sequelize, Sequelize);
db.Item = require('./item')(sequelize, Sequelize);

module.exports = db;
