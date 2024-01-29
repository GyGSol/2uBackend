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
  const mail = {
    to: "info@2uibiza.com",
    subject: "Contacto web",
    html: req.body.nombre 
    +" se contacto a traves de la web y quiere más informacion a este correo: "
    +req.body.email+"<br><b> Además, hizo el siguiente comentario: "+req.body.mensaje+"</b>"
  };

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 2525,
    auth: {
      user: process.env.SMTP_USE,
      pass: process.env.SMTP_PASS,
    },
  }); // cierra transp
  console.log("env",process.env.SMTP_PASS);
  await transport.sendMail(mail);

  res.status(201).json({
    error: false,
    message: "Mensaje enviado",
  });
});

router.post("/search", async (req, res, next) => {
  const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><title>2U Ibiza</title></head><body><h1>'+req.body.nombreCliente+'</h1</body></html>';
    const mail = {
    to: "info@2uibiza.com",
    subject: "Contacto web",
    html: html
  };

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 2525,
    auth: {
      user: process.env.SMTP_USE,
      pass: process.env.SMTP_PASS,
    },
  }); // cierra transp
 
  await transport.sendMail(mail);

  res.status(201).json({
    error: false,
    message: "Mensaje enviado",
  });
});

module.exports = router;
