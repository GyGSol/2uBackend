var express = require("express");
var router = express.Router();
var areasModel = require("../models/areasModel");


router.get("/", async function (req, res, next) {
  var areas = await areasModel.getAreas();
  res.render("areas", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    areas,
  });
});
/**
 * id, mes
 */
router.post("/", async (req, res, next) => {
  try {
    if (req.body.mes !== "") {
      await areasModel.addArea(req.body);
      res.redirect("areas");
    } else {
      res.render("area/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "El campo Area es requeridos.",
      });
    }
  } catch (error) {
    res.render("area/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo el Area. Error:" + error,
    });
  }
});
router.get("/agregar", async function (req, res, next) {
  res.render("area/agregar", {
    layout: "admin/layout",
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var area = await areasModel.getArea(id);
  res.render("area/modificar", {
    layout: "admin/layout",
    area,
  });
});

router.get("/delete/:id", async function (req, res, next) {
  var id = req.params.id;
  var resultado = await areasModel.deleteArea(id);
  res.redirect("/areas");
});
/**
 * id, area
 */
router.post("/modificar", async function (req, res, next) {
  try {
    var obj = {
        area: req.body.area,
    };
    await areasModel.updateArea(obj, req.body.id);
    res.redirect("/areas");
  } catch (error) {
    res.render("area/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico el Area. Error:" + error,
    });
  }
});

module.exports = router;
