const Sequelize = require('sequelize');
const connection = require('./database');

const Answer = connection.define('answers', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    askId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force: false}).then(function(){
    console.log("-answers- db table ok!")
});

module.exports = Answer;