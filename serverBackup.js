const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const favicon = require('serve-favicon');
const db = require('./db');
const app = express();
 
// views setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(cookieParser());
app.use(flash());
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

const login = "Henrique";
const password =  "Vidal";

/* Home page. */
app.route('/')
  .get((req, res) => getLoginPage(req, res))
  .post((req, res) => doLogin(req, res))

doLogin = (req, res) => {
  if(req.body.password == password && req.body.login == login) {
    req.session.login = login;    
    console.log("Usuário logado: "+ req.session.login);       
    res.render("logged");
    //res.send('doLogin');
  } else {
    res.render("index");  
  };
};
getLoginPage = (req, res) => {
  if(req.session.login == login) {
   res.render("logged");  
    //res.send('getLoginPage'); 
   } else {
    res.render("index");     
   }
};
app.route('/:logged').post((req, res) => addGuestAction(req, res))
addGuestAction = (req, res) => {
  let f_name = req.body.f_name;
  let l_name = req.body.l_name;
  let age = req.body.age;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  (async () => {
  const db = require("./db");
  //const delet0 = await db.deleteUser("22");
  const insertUser = await db.insertUser({nome: f_name, sobrenome: l_name, idade: age, email: email, telefone: phoneNumber});
  const clientes = await db.selectOnlyNames(); 
  console.log(clientes); 
  console.log('Convidado adicionado!');
  req.flash('success', 'Convidado adicionado com sucesso!');
  res.redirect('/');    
  })();
};
app.route('/:logout').get((req, res) => setLogout(req, res))
setLogout = (req, res) => {    
  console.log(req.session.login + " desconectou!"); 
  req.session.login = false;
  res.redirect('/');     
};
app.listen(3000, function () {
  console.log('Servidor rodando na porta: 3000');
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
 
module.exports = app;