const Convidado = require("../convidado");
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/add-guest', (req, res) => {
  req.flash("message", "Convidado Adicionado");
  if(req.session.login) {
    res.render('add-guest', {title: "Adicionar convidados"});
  } else {
    res.redirect("/", {expressFlash: req.flash("message")});
  }     
});
router.post('/:add-guest', (req, res) => {
  let f_name = req.body.f_name;
  let l_name = req.body.l_name;
  let age = req.body.age;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  (async () => {
  //const deletUser = await db.deleteUser("22");
  //const sql = {nome: "teste", sobrenome: "Pardinho", idade: "24", email: "980@asd", telefone: "32411241"};
  //const updateUser = await db.updateUser("6",sql);
  const insertUser = await db.insertUser({nome: f_name, sobrenome: l_name, idade: age, email: email, telefone: phoneNumber});
  //const clientes = await db.selectOnlyNames(); 
  //console.log(clientes); 
  console.log("(" + HourDate + ") " + 'Convidado adicionado!');
  })();
  req.flash("success", "Convidado Adicionado");
  res.render('add-guest', {title: "Adicionar Convidado",  expressFlash: req.flash("success")});    
});
router.post('/:deleteGuest', (req, res) => { 
  if (req.session.login) {
    (async () => {
      let deleteId = req.body.deleteId; 
      const deletUser = await db.deleteUser(deleteId);  
      console.log("(" + HourDate + ") " + "Convidado código "+ deleteId + " excluído!"); 
      Convidado.findAll().then(function(convidados){
      res.render("guest-list", {convidados: convidados, title: "Convidados cadastrados"});
      }); 
    })();
  } else {
    res.redirect("/");
  }
});
router.get('/:logout', (req, res) => { 
  console.log("(" + HourDate + ") " + req.session.login + " desconectou!"); 
  req.session.login = false;
  res.redirect('/');     
}); 

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

module.exports = router;
