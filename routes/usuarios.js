var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");
const md5 = require("md5");

router.get("/", async function (req, res, next) {
  var usuarios = await userModel.getUsers();
  res.render("usuarios", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    usuarios,
  });
});
/**
 * id, usuario, pass, rol
 */
router.post("/", async (req, res, next) => {
  try {
    if (
      req.body.usuario !== "" &&
      req.body.pass !== "" &&
      req.body.rol !== "" 
    ) {
      var obj = {
        usuario: req.body.usuario,
        pass: md5(req.body.pass),
        rol: req.body.rol
      };

      await userModel.addUser(obj);
      res.redirect("usuarios");
    } else {
      res.render("usuario/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "Los Campos usuario, pass y rol son requeridos.",
      });
    }
  } catch (error) {
    res.render("usuario/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo el Usuario. Error:" + error,
    });
  }
});
router.get("/agregar", async function (req, res, next) {
  var roles = await userModel.getRoles();
  console.log("roles",roles);
  res.render("usuario/agregar", {
    layout: "admin/layout",
    roles
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var roles = await userModel.getRoles();
  var usuario = await userModel.getUserId(id);
  res.render("usuario/modificar", {
    layout: "admin/layout",
    usuario,
    roles
  });
});

router.get("/delete/:id", async function (req, res, next) {
    var id = req.params.id;
    await userModel.deleteUser(id);
    res.redirect("/usuarios");
});
/**
 * id, usuario, pass, rol
 */
router.post("/modificar", async function (req, res, next) {
  try {
    var obj = {
      usuario: req.body.usuario,
      pass: md5(req.body.pass),
      rol: req.body.rol
    };

    await userModel.updateUser(obj, req.body.id);
    res.redirect("/usuarios");
  } catch (error) {
    res.render("usuario/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico el Usuarios. Error:" + error,
    });
  }
});

module.exports = router;
