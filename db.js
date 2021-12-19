/* ANTIGO MODO MYSQL
const mysql = require('mysql');
const connection = mysql.createConnection({
host: '127.0.0.1',
user: 'root', 
password: 'Pardinho1', 
database: 'convidados'
}); 
connection.connect(function(err) {
  if (err) throw err;
  console.log('Conectado no MySQL!');
  }); 

  module.exports = connection; */
  
  //Sequelize Setup
const { Sequelize, DataTypes } = require ("sequelize");
const sequelize = new Sequelize("mysql://wzy2zfza6343alpc:epehzau0unoaqtkg@uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/r3cwzgvgrzf7wga5");
sequelize.authenticate().then().catch(function(err){
  console.log("(" + HourDate + ") " + "Problema de conexão com o MySQL, erro: " + err);
});
   
    //MySQL2 Setup
async function connect(){
  if(global.connection && global.connection.state !== "disconnected") {
      return global.connection;
  }
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection("mysql://wzy2zfza6343alpc:epehzau0unoaqtkg@uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/r3cwzgvgrzf7wga5");
  console.log("(" + HourDate + ") " + "Conectado a MySQL! (MySQL2)");
  global.connection = connection;
  return connection;
};
async function countRow(){
  const conn = await connect();
  const [rows] = await conn.query("SELECT COUNT(nome) AS 'Quantidade:' FROM convidados;");
  return rows; 
};
async function selectUsers(){
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM convidados;");
  return rows;
};
async function selectOnlyNames(){
  const conn = await connect();
  const [rows] = await conn.query("SELECT id as Código, nome as Cliente FROM r3cwzgvgrzf7wga5.convidados;");
  return rows;
};
async function selectBarberOnlyNames(){
  const conn = await connect();
  const [rows] = await conn.query("SELECT nome as Cliente, servico as Servico, horario as Horario FROM convidados.clientes;");
  return rows;
};
async function selectNames(){
  const conn = await connect();
  const [rows] = await conn.query("SELECT nome FROM r3cwzgvgrzf7wga5.convidados where id=2;");
  return rows;
};
async function insertUser(user){
  const conn = await connect();
  const sql = "INSERT INTO r3cwzgvgrzf7wga5.convidados(nome, sobrenome, idade, email, telefone, createdAt, updatedAt) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);";
  const values = [user.nome, user.sobrenome, user.idade, user.email, user.telefone];
  await conn.query(sql, values);
};
async function insertBarberCustomer(user){
  const conn = await connect();
  const sql = "INSERT INTO convidados.clientes(nome, telefone, servico, horario, createdAt, updatedAt) VALUES (?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);";
  const values = [user.nome, user.telefone, user.servico, user.horario];
  await conn.query(sql, values);
};
async function updateUser(id, user){
  const conn = await connect();
  const sql = "UPDATE r3cwzgvgrzf7wga5.convidados SET nome=?, sobrenome=?, idade=?, email=?, telefone=?, updatedAt=CURRENT_TIMESTAMP WHERE id=?;";
  const values = [user.nome, user.sobrenome, user.idade, user.email, user.telefone, id];
  return await conn.query(sql, values);
};
async function deleteUser(id){
  const conn = await connect();
  const sql = "DELETE FROM r3cwzgvgrzf7wga5.convidados WHERE id=?;";
  return await conn.query(sql, [id]);
};

/////date time
function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
};
  const fullDate = new Date;
let hour = addZero(fullDate.getHours());
let min = addZero(fullDate.getMinutes());
let sec = addZero(fullDate.getSeconds());
let HourDate = hour + ":" + min + ":" + sec;

module.exports = { sequelize, connect, countRow, selectUsers, selectOnlyNames, selectBarberOnlyNames, selectNames, insertUser, insertBarberCustomer, updateUser, deleteUser };


