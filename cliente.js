const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('convidados', 'pclocal', 'Pardinho1', {host: '192.168.0.5', dialect: 'mysql'});
const db = require("./db");

const Cliente = sequelize.define("clientes", {
  id: { 
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING
  },
  telefone: {
    type: Sequelize.STRING
  },
  servico: {
    type: Sequelize.STRING
  },
  horario: {
    type: Sequelize.STRING
  }
  });

/* (async() => {
  const insertUser = await db.insertUser({nome: "Random", telefone: "15998109387", servico: "Corte de cabelo e Barba", horario: "11:30h"});
})();
 */

/* (async() => {
  const clientes = await db.selectOnlyNames();   
  console.log(clientes);  
})(); */

/* (async() => {
const jane = await cliente.create({nome: "Henrique Vidal", telefone: "15998109387", servico: "Corte de cabelo e Barba", horario: "13:20h"});
})(); */

module.exports = Cliente;