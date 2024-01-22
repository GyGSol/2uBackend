var express = require('express');
var router = express.Router();
var preciosModel = require("../models/preciosModel");
var mesesModel = require("../models/mesesModel");
var casasModel = require("../models/casasModel");


router.get("/", async function (req, res, next) {
  var precios = await preciosModel.getPrecios();
  res.render("precios", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    precios,
  });
});
/**
 * id, precio, costo, rentaPorcentual, idMes
 */
router.post("/", async (req, res, next) => {
  try {
    if (
      req.body.precio !== "" &&
      req.body.costo !== "" &&
      req.body.rentaPorcentual !== "" 
    ) {
      await preciosModel.addPrecio(req.body);
      res.redirect("precios");
    } else {
      res.render("precio/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "Los Campos precio, costo y renta porcentual son requeridos.",
      });
    }
  } catch (error) {
    res.render("precio/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo el precio. Error:" + error,
    });
  }
});
router.get("/agregar", async function (req, res, next) {
  var meses = await mesesModel.getMeses();
  var casas = await casasModel.getCasas();
  res.render("precio/agregar", {
    layout: "admin/layout",
    meses,
    casas
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var precio = await preciosModel.getPrecio(id);
  var meses = await mesesModel.getMeses();
  var casas = await casasModel.getCasas();
  res.render("precio/modificar", {
    layout: "admin/layout",
    precio,
    meses,
    casas
  });
});

router.get("/delete/:id", async function (req, res, next) {
    var id = req.params.id;
    await preciosModel.deletePrecio(id);
    res.redirect("/precios");
});
/**
 * id, precio, costo, rentaPorcentual, idMes
 */
router.post("/modificar", async function (req, res, next) {
  try {
    var obj = {
      precio: req.body.precio,
      costo: req.body.costo,
      rentaPorcentual: req.body.rentaPorcentual,
      idMes: req.body.idMes
    };
    await preciosModel.updatePrecio(obj, req.body.id);
    res.redirect("/precios");
  } catch (error) {
    res.render("precio/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico el casa. Error:" + error,
    });
  }
});

module.exports = router;