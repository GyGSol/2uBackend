var express = require("express");
var router = express.Router();
var clientesModel = require("../../models/clientesModel");

router.get("/", async function (req, res, next) {
  var clientes = await clientesModel.getClientes();
  res.render("admin/principal", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    isAdmin: req.session.isAdmin,
    clientes,
  });
});
/**
 * id, nombre, apellido, nacionalidad, documento, email, telefono, movil
 */
router.post("/cliente/agregar", async (req, res, next) => {
  try {
    if (
      req.body.nombre !== "" &&
      req.body.apellido !== "" &&
      req.body.email !== "" &&
      req.body.movil !== ""
    ) {
      await clientesModel.addClientes(req.body);
      res.redirect("admin/principal");
    } else {
      res.render("cliente/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "Los Campos Nombre, Apellido, Email y Movil so requeridos.",
      });
    }
  } catch (error) {
    res.render("cliente/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo el cliente. Error:" + error,
    });
  }
});

module.exports = router;
