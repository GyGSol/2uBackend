var express = require("express");
var router = express.Router();
var casasModel = require("../models/casasModel");
var propietariosModel = require("../models/propietariosModel");
var vistasModel = require("../models/vistasModel");
var areasModel = require("../models/areasModel");
var clientesModel = require("../models/clientesModel");
var paisesModel = require("../models/paisesModel");
var mesesModel = require("../models/mesesModel");
var ocupacionModel = require("../models/ocupacionModel");
var preciosModel = require("../models/preciosModel");
var userModel = require("../models/userModel");
var nosotrosModel = require("../models/nosotrosModel");
var contactoModel = require("../models/contactoModel");

var cloudinary = require("cloudinary").v2;

router.get("/casas", async function (req, res, next) {
    var casas = await casasModel.getCasas();
    var preciosMes = await mesesModel.getMesesMostrar();
    casas = casas.map((casa) => {
      const precio=preciosMes.filter((item) => item.idCasa === casa.id)
      if (casa.linkimagen) {
        const imagen = cloudinary.url(casa.linkimagen, {
          width: 400,
          height: 240,
          crop: "fill",
        });
        return {
          ...casa,precio,
          imagen
        };
      } else {
        return {
          ...casa,precio,
          imagen: ""
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
          height: 548,
          crop: "fill",
        });
        return {
          ...nos,
          imagen
        };
      } else {
        return {
          ...nos,
          imagen: ""
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
          width: 509,
          height: 544,
          crop: "fill",
        });
        return {
          ...contac,
          imagen
        };
      } else {
        return {
          ...contac,
          imagen: ""
        };
      }
    });
  
    res.json(contacto[0]);
  });

  module.exports = router;