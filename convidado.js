const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('r3cwzgvgrzf7wga5', 'wzy2zfza6343alpc', 'epehzau0unoaqtkg', {host: 'uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com', dialect: 'mysql'});
const db = require("./db");

const convidado = sequelize.define("convidados", {
  id: { 
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING
  },
  sobrenome: {
    type: Sequelize.STRING
  },
  idade: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  telefone: {
    type: Sequelize.STRING
  }
});

module.exports = convidado;