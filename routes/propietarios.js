var express = require('express');
var router = express.Router();
var propietariosModel = require("../models/propietariosModel");


router.get("/", async function (req, res, next) {
  var propietarios = await propietariosModel.getPropietarios();
  res.render("propietarios", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    propietarios,
  });
});
/**
 * id, nombre, apellido, tax
 */
router.post("/", async (req, res, next) => {
  try {
    if (
      req.body.nombre !== "" &&
      req.body.apellido !== "" &&
      req.body.tax !== "" 
    ) {
      await propietariosModel.addPropietario(req.body);
      res.redirect("propietarios");
    } else {
      res.render("propietario/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "Los Campos nombre, dormitorios, linkpdf, linkvideo, linkimagen, propietario y baños son requeridos.",
      });
    }
  } catch (error) {
    res.render("propietario/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo la casa. Error:" + error,
    });
  }
});
router.get("/agregar", async function (req, res, next) {
  res.render("propietario/agregar", {
    layout: "admin/layout",
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var propietario = await propietariosModel.getPropietario(id);
  res.render("propietario/modificar", {
    layout: "admin/layout",
    propietario
  });
});

router.get("/delete/:id", async function (req, res, next) {
    var id = req.params.id;
    await propietariosModel.deletePropietario(id);
    res.redirect("/propietarios");
});
/**
 * id, nombre, apellido, tax
 */
router.post("/modificar", async function (req, res, next) {
  try {
    var obj = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      tax: req.body.tax
    };
    console.log("mod prop:",obj);
    await propietariosModel.updatePropietario(obj, req.body.id);
    res.redirect("/propietarios");
  } catch (error) {
    res.render("propietario/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico el casa. Error:" + error,
    });
  }
});

module.exports = router;