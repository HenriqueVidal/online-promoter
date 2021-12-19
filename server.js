const { engine }  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const Convidado = require("./convidado");
const favicon = require('serve-favicon');
const flash = require('connect-flash');
const port = process.env.PORT || 5000;
const Cliente = require("./cliente");
const express = require('express');
const logger = require('morgan');
const path = require('path');
const db = require('./db');
const app = express();

// VIEWS SETUP
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main", runtimeOptions: {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true,
}}));
app.set('view engine', 'hbs');
app.set('views', './views');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(cookieParser());
app.use(flash());
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 }
}));

/*
let guestCount = setInterval(async () => {
    CountRow = await Convidado.count();
    return CountRow;
}, 10000);
 let guestCount = CountRow; */

app.use(function (req,res, next) {
 res.set("Cache-Control", "no-store");
next();
});

 app.use(function(req, res, next){
  // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
  });

////// PAGES ROUTES
app.use("/a", require("./routes/add"));
app.use("/e", require("./routes/edit"));
app.use("/l", require("./routes/list"));
app.use("/p", require("./routes/print"));
app.use("/tes", require("./routes/barberadd"));

const login = "admin";  const password = "admin";


app.all("/express-flash", function(req,res) {
  req.flash("message", "login Incorreto");
res.redirect(301, "/");
});

app.all('/session-flash', function( req, res ) {
  req.session.sessionFlash = {
    type: 'success',
    message: 'This is a flash message using custom middleware and express-session.'
  }
  res.redirect(301, '/');
});

////// HOME PAGE
app.get('/', (req, res) => {
  if(req.session.login == login) {
    guestCount = Convidado.count();
    Convidado.findAll().then(function(convidados){
    res.render("guest-list", {convidados: convidados, title: "Convidados cadastrados"});
    });    
    /*res.render("guest-list", {title: "Adicionar Convidado"});*/
  } else if(req.body.login == "cliente") {
    guestCount = Convidado.count();
    Convidado.findAll().then(function(convidados){
    res.render("guest-list", {convidados: convidados, title: "Convidados cadastrados"});
    });    
    /*res.render("guest-list", {title: "Adicionar Convidado"});*/
  } else if(req.session.login == "b") {
    res.render("add-customer", {title: "Marcar horário"});
  } else {
    res.render("home", {title: "Login"});     
  }
});
app.post('/', (req, res) => {
  if(req.body.password == password && req.body.login == login) {
    req.session.login = login;      
    console.log("(" + HourDate + ") " + "Usuário conectado: "+ req.session.login); 
    (async () => {
      guestCount = await Convidado.count();
      Convidado.findAll().then(function(convidados){
      res.render("guest-list", {convidados: convidados, guestCount, title: "Convidados cadastrados"});
      });
    })();
  } else if(req.body.password == "cliente" && req.body.login == "cliente") {
   req.session.login = "cliente";
   console.log("(" + HourDate + ") " + "Usuário conectado: " + req.session.login); 
    (async () => {
      guestCount = await Convidado.count();
      Convidado.findAll().then(function(convidados){
      //const addGuest = Convidado.create({ nome: "Pardinho", sobrenome: "random", idade: "28", email: "hhhhl@outlook", telefone: "165457546" });
      res.render("guest-list", {convidados: convidados, guestCount, title: "Convidados cadastrados"});
      });
  })();
  } else if(req.body.password == "b" && req.body.login == "b") {
    req.session.login = "b";
    console.log("(" + HourDate + ") " + "Usuário conectado: " + req.session.login); 
    res.render("add-customer", {title: "Marcar horários"});
  } else {
    req.flash('error', 'Usuário ou Senha incorreto(a)!');
    res.render("home", {title: "Login", expressFlash: req.flash('error')});  
  };
});
app.post('/:deleteGuest', (req, res) => { 
  if (req.session.login) {
    (async () => {
      const db = require("./db");  
      let deleteId = req.body.deleteId; 
      const deletUser = await db.deleteUser(deleteId);  
      console.log("(" + HourDate + ") " + "Convidado código "+ deleteId + " excluído!");
      guestCount = await Convidado.count(); Convidado.findAll().then(function(convidados){
      res.render("guest-list", {convidados: convidados, guestCount, title: "Convidados cadastrados"});
      }); 
    })();
  } else {
      res.redirect("/");
  }
});
app.get('/:logout', (req, res) => { 
  console.log("(" + HourDate + ") " + req.session.login + " desconectou!"); 
  req.session.login = false;
  res.redirect('/');     
}); 

app.listen(port, function () {
  console.log('Servidor rodando na porta: 5000');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
};

///// date time
const fullDate = new Date;
let hour = addZero(fullDate.getHours());
let min = addZero(fullDate.getMinutes());
let sec = addZero(fullDate.getSeconds());
let HourDate = hour + ":" + min + ":" + sec;
let dayDate = fullDate.getDate() + "/" + (fullDate.getMonth+1) + "/" + fullDate.getFullYear();

module.exports = app;
