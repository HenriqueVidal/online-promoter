const Convidado = require("../convidado");
const express = require('express');
const router = express.Router();
const app = require('../server');
let pdf = require("html-pdf");
const db = require('../db');

router.get('/print', (req, res, next) => {  
  if (req.session.login) {
    (async () => {
      guestCount = await Convidado.count();
      Convidado.findAll().then(function(convidados){
        res.render("print", {convidados: convidados, guestCount, title: "Imprimir Lista de convidados"});
      //res.download('./files/lista-de-convidados.pdf');
      //res.render("print", {convidados: convidados, title: "Imprimir Lista de convidados"});
      });
     })();
  } else {
    res.redirect("/");
  }
}); 
router.post("/:download", (req, res) => {
  res.download('./files/lista-de-convidados.pdf');
});
router.get('/:print', (req, res) => {  
  if (req.session.login) {
    Convidado.findAll().then(function(convidados){
    res.render("print", {convidados: convidados, title: "Imprimir Lista de convidados"});
    });
  } else {
    res.redirect("/");
  }
});
router.get('/:logout', (req, res) => { 
  console.log(req.session.login + " desconectou!"); 
  req.session.login = false;
  res.redirect('/');     
}); 

module.exports = router;
