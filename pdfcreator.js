let hbs = require('handlebars');
let pdf = require("html-pdf");
const app = require('./server');
const Convidado = require("./convidado");

/* const data = {
	title: "A new Brazilian School"
};
let file = hbs.compile("./routes/print.hbs");
let html = file(data); */

let config = {
    "format": "A4",
    "orientation": "portrait", // portrait or landscape
  
    "border": {
      "top": "10px",
      "right": "10px",
      "bottom": "10px",
      "left": "10px"
    }
};
Convidado.findAll().then(function(convidados){
    app.render("print", {convidados: convidados, title: "Imprimir Lista de convidados"}, (err, html) => {
        if(err){
            return console.log(err);
        } else {
            pdf.create(html, config).toFile("./files/lista-de-convidados.pdf", (err,res) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Arquivo PDF criado.");
                }
            });
        }
    });
});
/* pdf.create(html, {}).toFile("./files/lista-de-convidados.pdf", (err,res) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Arquivo PDF criado.");
    }
}); */