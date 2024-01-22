var express = require("express");
var router = express.Router();
var mesesModel = require("../models/mesesModel");


router.get("/", async function (req, res, next) {
  var meses = await mesesModel.getMeses();
  res.render("meses", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    meses,
  });
});
/**
 * id, mes
 */
router.post("/", async (req, res, next) => {
  try {
    if (req.body.mes !== "") {
      await mesesModel.addMeses(req.body);
      res.redirect("meses");
    } else {
      res.render("mes/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "El campo Mes es requeridos.",
      });
    }
  } catch (error) {
    res.render("mes/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo el mes. Error:" + error,
    });
  }
});
router.get("/agregar", async function (req, res, next) {
  var meses = await mesesModel.getMeses();
  res.render("mes/agregar", {
    layout: "admin/layout",
    meses,
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var mes = await mesesModel.getMes(id);
  res.render("mes/modificar", {
    layout: "admin/layout",
    mes,
  });
});

router.get("/delete/:id", async function (req, res, next) {
  var id = req.params.id;
  var resultado = await mesesModel.deleteMes(id);
  res.redirect("/meses");
});
/**
 * id, mes
 */
router.post("/modificar", async function (req, res, next) {
  try {
    var obj = {
      mes: req.body.mes,
    };
    await mesesModel.updateMes(obj, req.body.id);
    res.redirect("/meses");
  } catch (error) {
    res.render("mes/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico el Mes. Error:" + error,
    });
  }
});

module.exports = router;
