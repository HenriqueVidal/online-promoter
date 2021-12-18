const Convidado = require("../convidado");
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/edit-guest', (req, res) => {
  if(req.session.login) { 
    Convidado.findAll().then(function(convidados){
      res.render("edit-guest", {convidados: convidados, title: "Editar Convidados"});
      });
 /*    res.render('edit-guest', {title: "Editar convidados"}); */
  } else {
    res.redirect("/");
  }
});
router.post('/:edit-guest', (req, res, next) => {
  if (req.session.login) {
    let guestId = req.body.guestId;
    let f_name = req.body.f_name;
    let l_name = req.body.l_name;
    let age = req.body.age;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    (async () => {
    const updateUser = await db.updateUser(guestId,{nome: f_name, sobrenome: l_name, idade: age, email: email, telefone: phoneNumber});
    })();    
    req.flash("success", "Convidado Modificado");
    Convidado.findAll().then(function(convidados){
      res.render("edit-guest", {convidados: convidados, title: "Editar Convidados",  expressFlash: req.flash("success")});
    });
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
