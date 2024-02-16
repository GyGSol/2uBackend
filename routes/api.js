var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var casasModel = require("../models/casasModel");
var personalModel = require("../models/personalModel");
var vistasModel = require("../models/vistasModel");
var areasModel = require("../models/areasModel");
var paisesModel = require("../models/paisesModel");
var mesesModel = require("../models/mesesModel");
var nosotrosModel = require("../models/nosotrosModel");
var contactoModel = require("../models/contactoModel");

var cloudinary = require("cloudinary").v2;

router.get("/casas", async function (req, res, next) {
  var casas = await casasModel.getCasas();
  var preciosMes = await mesesModel.getMesesMostrar();
  casas = casas.map((casa) => {
    const precio = preciosMes.filter((item) => item.idCasa === casa.id);
    if (casa.linkimagen) {
      const imagen = cloudinary.url(casa.linkimagen, {
        width: 350,
        height: 200,
        crop: "fill",
      });
      return {
        ...casa,
        precio,
        imagen,
      };
    } else {
      return {
        ...casa,
        precio,
        imagen: "",
      };
    }
  });

  res.json(casas);
});

router.get("/areas", async function (req, res, next) {
  var areas = await areasModel.getAreas();
  res.json(areas);
});

router.get("/vistas", async function (req, res, next) {
  var vistas = await vistasModel.getVistas();
  res.json(vistas);
});

router.get("/paises", async function (req, res, next) {
  var paises = await paisesModel.getPaises();
  res.json(paises);
});
router.get("/mesesPrecio", async function (req, res, next) {
  var mesesPrecio = await mesesModel.getMesesMostrar();
  res.json(mesesPrecio);
});

router.get("/nosotros", async function (req, res, next) {
  var nosotros = await nosotrosModel.getNosotros();
  nosotros = nosotros.map((nos) => {
    if (nos.linkimagen) {
      const imagen = cloudinary.url(nos.linkimagen, {
        width: 386,
        height: 600,
        crop: "fill",
      });
      return {
        ...nos,
        imagen,
      };
    } else {
      return {
        ...nos,
        imagen: "",
      };
    }
  });

  res.json(nosotros[0]);
});

router.get("/contactos", async function (req, res, next) {
  var contacto = await contactoModel.getContactos();
  contacto = contacto.map((contac) => {
    if (contac.linkimagen) {
      const imagen = cloudinary.url(contac.linkimagen, {
        width: 510,
        height: 520,
        crop: "fill",
      });
      return {
        ...contac,
        imagen,
      };
    } else {
      return {
        ...contac,
        imagen: "",
      };
    }
  });

  res.json(contacto[0]);
});

router.get("/personal", async function (req, res, next) {
  var personal = await personalModel.getPersonal();
  personal = personal.map((per) => {
    console.log(personal);
    if (per.linkimagen) {
      const imagen = cloudinary.url(per.linkimagen, {
        width: 250,
        height: 250,
        crop: "fill",
      });
      return {
        ...per,
        imagen,
      };
    } else {
      return {
        ...per,
        imagen: "",
      };
    }
  });

  res.json(personal);
});

router.post("/contacto", async (req, res, next) => {
  
  var html ='<!DOCTYPE html>';
  html += '<html>'
  html += '<head>';
  html += '<meta charset="utf-8">';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1">';
  html += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">'
  html += '</head>';
  html += '<body>';
  html += '<h2>'+req.body.nombre+'</h2>';
  html += '<p>Se contacto a traves de la web y quiere más informacion a este correo: '+req.body.email+'</p>'
  html += '<p>Además, hizo el siguiente comentario: <b>'+req.body.mensaje+'</b></p>'
  html += '</body></html>';

  const mail = {
    to: "gonzalomlopolito@gmail.com",
    subject: "Contacto web",
    html: html
  };

  const transport = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USE,
      pass: process.env.SMTP_PASS,
    },
  });

  console.log("env",process.env.SMTP_PASS);
  await transport.sendMail(mail);

  res.status(201).json({
    error: false,
    message: "Mensaje enviado",
  });
});
let dataFrom={};
router.post("/searchFrom", async (req, res, next) => {
  dataFrom=req.body;
  res.status(201).json({
    error: false,
    message: "Mensaje enviado",
  });
});

router.post("/search", async (req, res, next) => {
  var respuesta = await casasModel.getCasas();
  const parametros = req.body;
  
  var html ='<!DOCTYPE html>';
  html += '<html>'
  html += '<head>';
  html += '<meta charset="utf-8">';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1">';
  html += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">'
  html += '</head>';
  html += '<body>';
  html += '<h1>' + dataFrom.nombreCliente + '</h1>';
  html += '<h5>Email: ' + dataFrom.email + '</h5>';
  html += '<h5>Solicitudes especiales: ' + dataFrom.especial + '</h5>';
  html += '<h5>Arrival day: ' + dataFrom.fechaDesde + '</h5>';
  html += '<h5>Departure day: ' + dataFrom.fechaHasta + '</h5>';
  html += '<h6>Approximate budget / Week: ' + dataFrom.importe + '</h6>';
  parametros.map((item) => {
    html += '<br><h1>' + item.nombre + '</h1>';
    html += '<h2>' + item.dormitorios + " Bedrooms</h2>";
    html += '<h2>Views: ' + item.vista + '</h2>';
    html += '<p>' + item.dormitorios + " Bathrooms</p>";
    html += '<h4><a style="text-decoration: none" href=' + item.linkpdf + '>PDF</a></h4>';
    html += '<h4><a style="text-decoration: none" href=' + item.linkvideo + '>VIDEO</h4>';
    html += '<div><img style="border-radius:15px" src=' + item.imagen + '></div>';
    html += '<h4>Location: ' + item.vista + '</h4>';
  });
  html += '</body></html>';
  const mail = {
    to: "gonzalomlopolito@gmail.com",
    subject: "Properties search",
    html: html,
  };

  /*const transport2 = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 2525,
    auth: {
      user: process.env.SMTP_USE,
      pass: process.env.SMTP_PASS,
    },
  }); // cierra transp*/
  
  const transport = nodemailer.createTransport({
    service: "Gmail",
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USE,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail(mail);

  res.status(201).json({
    error: false,
    message: "Mensaje enviado",
  });
});

module.exports = router;
