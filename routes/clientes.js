var express = require('express');
var router = express.Router();
var clientesModel = require("../models/clientesModel");
var paisesModel = require("../models/paisesModel");

router.get("/", async function (req, res, next) {
  var clientes = await clientesModel.getClientes();
  res.render("clientes", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    clientes,
  });
});
/**
 * id, nombre, apellido, nacionalidad, documento, email, telefono, movil
 */
router.post("/", async (req, res, next) => {
  try {
    if (
      req.body.nombre !== "" &&
      req.body.apellido !== "" &&
      req.body.email !== "" &&
      req.body.movil !== ""
    ) {
      await clientesModel.addClientes(req.body);
      res.redirect("clientes");
    } else {
      res.render("cliente/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "Los Campos Nombre, Apellido, Email y Movil son requeridos.",
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
router.get("/agregar", async function (req, res, next) {
  var paises = await paisesModel.getPaises();
  res.render("cliente/agregar", {
    layout: "admin/layout",
    paises
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var paises = await paisesModel.getPaises();
  var cliente = await clientesModel.getCliente(id);
  res.render("cliente/modificar", {
    layout: "admin/layout",
    cliente,
    paises
  });
});

router.get("/delete/:id", async function (req, res, next) {
    var id = req.params.id;
    var resultado = await clientesModel.deleteClientes(id);
    res.redirect("/clientes");
});
/**
 * id, nombre, apellido, nacionalidad, documento, email, telefono, movil
 */
router.post("/modificar", async function (req, res, next) {
  try {
    var obj = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      nacionalidad: req.body.nacionalidad,
      documento: req.body.documento,
      email: req.body.email,
      telefono: req.body.telefono,
      movil: req.body.movil,
    };
    console.log(obj);
    await clientesModel.updateCliente(obj, req.body.id);
    res.redirect("/clientes");
  } catch (error) {
    res.render("cliente/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico el cliente. Error:" + error,
    });
  }
});

module.exports = router;