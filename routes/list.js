const Convidado = require("../convidado");
const express = require('express');
const router = express.Router();
const db = require('../db');

/* const CountRow = async () => {
    guestCount = await Convidado.count();
    return guestCount;
}; 
let guestCount = Convidado.count();*/
router.all('/session-flash', function( req, res ) {
  req.session.sessionFlash = {
    type: 'info',
    message: 'This is a flash message using custom middleware and express-session.'
  }
  res.redirect(301, '/');
});

router.get('/guest-list', (req, res) => {  
  if (req.session.login) {
    (async () => {
      guestCount = await Convidado.count();
      Convidado.findAll().then(function(convidados){
      res.render("guest-list", {convidados: convidados, guestCount, title: "Convidados cadastrados"});
      });
    })();
  } else {
    res.redirect("/");
  }
}); 
router.get('/:guest-list', (req, res) => {  
  if (req.session.login) {
    (async () => {
      guestCount = await Convidado.count();
      Convidado.findAll().then(function(convidados){
      res.render("guest-list", {convidados: convidados, guestCount, title: "Convidados cadastrados"});
      });
    })();
  } else {
    res.redirect("/");
  }
});
router.post('/:deleteGuest', (req, res) => { 
  if (req.session.login) {
    (async () => { 
      let deleteId = req.body.deleteId; 
      const deletUser = await db.deleteUser(deleteId);  
      console.log("Convidado código "+ deleteId + " excluído!");
      guestCount= await Convidado.count()
Convidado.findAll().then(function(convidados){
      res.render("guest-list", {convidados: convidados, guestCount, title: "Convidados cadastrados"});
      }); 
    })();
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
