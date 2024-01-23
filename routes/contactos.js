var express = require("express");
var router = express.Router();
var contactoModel = require("../models/contactoModel");

var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get("/", async function (req, res, next) {
  var contacto = await contactoModel.getContactos();
  contacto = contacto.map((c) => {
    if (c.linkimagen) {
      const imagen = cloudinary.image(c.linkimagen, {
        width: 70,
        height: 100,
        crop: "fill",
      });
      return {
        ...c,
        imagen,
      };
    } else {
      return {
        ...c,
        imagen: "",
      };
    }
  });

  res.render("contactos", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    contacto,
  });
});
/**
 * id, tetxo1,imagen, fecha
 */
router.post("/", async (req, res, next) => {
  try {
    var linkimagen = "";

    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      linkimagen = (await uploader(imagen.tempFilePath)).public_id;
    }
    if (req.body.texto1 !== "") {
      await contactoModel.addContacto({
        ...req.body,
        linkimagen,
      });
      res.redirect("contactos");
    } else {
      res.render("contacto/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "Los campos texto 1 es requeridos.",
      });
    }
  } catch (error) {
    res.render("contacto/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo. Error:" + error,
    });
  }
});
router.get("/agregar", async function (req, res, next) {
  var contacto = await contactoModel.getContactos();
  res.render("contacto/agregar", {
    layout: "admin/layout",
    contacto,
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var contacto = await contactoModel.getContacto(id);
  console.log(contacto)
  res.render("contacto/modificar", {
    layout: "admin/layout",
    contacto
  });
});

router.get("/delete/:id", async function (req, res, next) {
  var id = req.params.id;
  var resultado = await contactoModel.deleteContacto(id);
  res.redirect("/contactos");
});
/**
 * id, texto1, imagen
 */
router.post("/modificar", async function (req, res, next) {
  try {
    let linkimagen = req.body.imagenActual;
    let imagenVieja = false;

    if (req.body.eliminarImagen === "1") {
      linkimagen = null;
      imagenVieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        linkimagen = (await uploader(imagen.tempFilePath)).public_id;
        imagenVieja = true;
      }
    }
    if (imagenVieja && req.body.imagenActual) {
      await destroy(req.body.imagenActual);
    }
    var obj = {
      texto1: req.body.texto1,
      linkimagen
    };
    await contactoModel.updateContacto(obj, req.body.id);
    res.redirect("/contactos");
  } catch (error) {
    res.render("contacto/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico el Contacto. Error:" + error,
    });
  }
});

module.exports = router;