const Sequelize = require('sequelize');
const connection = require('./database');

const Ask = connection.define('asks', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Ask.sync({force: false}).then(function(){
    console.log("-ask- db table ok!");
});

module.exports = Ask;