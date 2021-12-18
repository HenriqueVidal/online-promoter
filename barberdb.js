  //Sequelize Setup
const { Sequelize, DataTypes } = require ("sequelize");
const sequelize = new Sequelize('barbershop', 'pclocal', 'Pardinho1', {host: '192.168.0.5', dialect: 'mysql', define: {
  timestamps: true,
  underscored: true
}});
sequelize.authenticate().then().catch(function(err){
  console.log("Problema de conexão com o MySQL, erro: " + err);
});
   
    //MySQL2 Setup
async function connect(){
  if(global.connection && global.connection.state !== "disconnected") {
      return global.connection;
  }
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection("mysql://pclocal:Pardinho1@192.168.0.5:3306/barbershop");
  console.log("Conectado a MySQL! (BarberShop)");
  global.connection = connection;
  return connection;
};
async function countRow(){
  const conn = await connect();
  const [rows] = await conn.query("SELECT COUNT(nome) AS 'Quantidade:' FROM cliente;");
  return rows; 
};
async function selectUsers(){
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM clientes;");
  return rows;
};
async function selectOnlyNames(){
  const conn = await connect();
  const [rows] = await conn.query("SELECT nome as Cliente, servico as Servico, horario as Horario FROM clientes;");
  return rows;
};
async function selectNames(){
  const conn = await connect();
  const [rows] = await conn.query("SELECT nome FROM cliente where id=2;");
  return rows;
};
async function insertUser(user){
  const conn = await connect();
  const sql = "INSERT INTO clientes(nome, telefone, servico, horario, createdAt, updatedAt) VALUES (?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);";
  const values = [user.nome, user.telefone, user.servico, user.horario];
  await conn.query(sql, values);
};
async function updateUser(id, user){
  const conn = await connect();
  const sql = "UPDATE clientes SET nome=?, sobrenome=?, idade=?, email=?, telefone=?, updatedAt=CURRENT_TIMESTAMP WHERE id=?;";
  const values = [user.nome, user.sobrenome, user.idade, user.email, user.telefone, id];
  return await conn.query(sql, values);
};
async function deleteUser(id){
  const conn = await connect();
  const sql = "DELETE FROM clientes WHERE id=?;";
  return await conn.query(sql, [id]);
};



module.exports = { sequelize, connect, countRow, selectUsers, selectOnlyNames, selectNames, insertUser, updateUser, deleteUser };


