var express = require('express');
var router = express.Router();
var ocupacionModel = require("../models/ocupacionModel");
var casasModel = require("../models/casasModel");


router.get("/", async function (req, res, next) {
  var ocupaciones = await ocupacionModel.getOcupaciones();
  res.render("ocupaciones", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    ocupaciones,
  });
});
/**
 * id, casa, fechaDesde, fechaHasta
 */
router.post("/", async (req, res, next) => {
  try {
    if (
      req.body.casa !== "" &&
      req.body.fechaDesde !== "" &&
      req.body.fechaHasta !== "" 
    ) {
      await ocupacionModel.addOcupacion(req.body);
      res.redirect("ocupaciones");
    } else {
      res.render("ocupacion/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "Los Campos alojamiento, fecha desde y fecha hasta son requeridos.",
      });
    }
  } catch (error) {
    res.render("ocupacion/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo la ocupación. Error:" + error,
    });
  }
});
router.get("/agregar", async function (req, res, next) {
  var casas = await casasModel.getCasas();  
  res.render("ocupacion/agregar", {
    layout: "admin/layout",
    casas
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var ocupacion = await ocupacionModel.getOcupacion(id);
  var casas = await casasModel.getCasas();
  res.render("ocupacion/modificar", {
    layout: "admin/layout",
    ocupacion,
    casas
  });
});

router.get("/delete/:id", async function (req, res, next) {
    var id = req.params.id;
    await ocupacionModel.deleteOcupacion(id);
    res.redirect("/ocupaciones");
});
/**
 * id, casa, fechaDesde, fechaHasta
 */
router.post("/modificar", async function (req, res, next) {
  try {
    var obj = {
      casa: req.body.casa,
      fechaDesde: req.body.fechaDesde,
      fechaHasta: req.body.fechaHasta
    };
    console.log("mod prop:",obj);
    await ocupacionModel.updateOcupacion(obj, req.body.id);
    res.redirect("/ocupaciones");
  } catch (error) {
    res.render("ocupacion/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico la ocupación. Error:" + error,
    });
  }
});

module.exports = router;