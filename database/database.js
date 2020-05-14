const Sequelize = require('sequelize');
const connection = new Sequelize('ask', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql'
});
module.exports = connection;