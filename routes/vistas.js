var express = require("express");
var router = express.Router();
var vistasModel = require("../models/vistasModel");


router.get("/", async function (req, res, next) {
  var vistas = await vistasModel.getVistas();
  res.render("vistas", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    vistas,
  });
});
/**
 * id, mes
 */
router.post("/", async (req, res, next) => {
  try {
    if (req.body.vista !== "") {
      await vistasModel.addVista(req.body);
      res.redirect("vistas");
    } else {
      res.render("vista/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "El campo Vista es requeridos.",
      });
    }
  } catch (error) {
    res.render("vista/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo la vista. Error:" + error,
    });
  }
});
router.get("/agregar", async function (req, res, next) {
  var vistas = await vistasModel.getVista();
  res.render("vista/agregar", {
    layout: "admin/layout",
    vistas,
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var vista = await vistasModel.getVista(id);
  res.render("vista/modificar", {
    layout: "admin/layout",
    vista,
  });
});

router.get("/delete/:id", async function (req, res, next) {
  var id = req.params.id;
  var resultado = await vistasModel.deleteVista(id);
  res.redirect("/vistas");
});
/**
 * id, vista
 */
router.post("/modificar", async function (req, res, next) {
  try {
    var obj = {
        vista: req.body.vista,
    };
    await vistasModel.updateVista(obj, req.body.id);
    res.redirect("/vistas");
  } catch (error) {
    res.render("vista/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico la vista. Error:" + error,
    });
  }
});

module.exports = router;
