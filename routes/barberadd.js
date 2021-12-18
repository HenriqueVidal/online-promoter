const Cliente = require("../cliente");
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/add-customer', (req, res) => {
  req.flash("message", "Convidado Adicionado");
  if(req.session.login) {
    res.render('add-customer', {title: "Marcar horário"});
  } else {
    res.redirect("/", {expressFlash: req.flash("message")});
  }     
});
router.post('/:add-customer', (req, res) => {
  let customerName = req.body.customerName;
  let phoneNumber = req.body.phoneNumber;
  let service = req.body.service;
  let time = req.body.time;
  (async () => {
  //const deletUser = await db.deleteUser("22");
  //const sql = {nome: "teste", sobrenome: "Pardinho", idade: "24", email: "980@asd", telefone: "32411241"};
  //const updateUser = await db.updateUser("6",sql);
  const insertUser = await db.insertBarberCustomer({nome: customerName, telefone: phoneNumber, servico: service, horario: time});
  const clientes = await db.selectBarberOnlyNames(); 
  console.log(clientes); 
  console.log('Convidado adicionado!');
  })();
  req.flash("success", "Cliente Adicionado");
  res.render('add-customer', {title: "Adicionar Convidado",  expressFlash: req.flash("success")});    
});
router.get('/:logout', (req, res) => { 
  console.log(req.session.login + " desconectou!"); 
  req.session.login = false;
  res.redirect('/');     
}); 

module.exports = router;
