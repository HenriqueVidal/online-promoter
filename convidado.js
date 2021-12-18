const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('convidados', 'pclocal', 'Pardinho1', {host: '192.168.0.5', dialect: 'mysql'});
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