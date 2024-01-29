var express = require("express");
var router = express.Router();
var personalModel = require("../models/personalModel");

var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get("/", async function (req, res, next) {
  
  var personal = await personalModel.getPersonal();

  personal = personal.map((per) => {
    if (per.linkimagen) {
      const imagen = cloudinary.image(per.linkimagen, {
        width: 70,
        height: 70,
        crop: "fill",
      });
      return {
        ...per,
        imagen,
      };
    } else {
      return {
        ...per,
        imagen: "",
      };
    }
  });

  res.render("personal", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    personal,
  });
});
/**
 * id, nombre, descripcion, linkimagen
 */
router.post("/", async (req, res, next) => {
  try {
    var linkimagen = "";

    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      linkimagen = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.nombre !== "" && req.body.descripcion !== "") {
      await personalModel.addPersona({
        ...req.body,
        linkimagen,
      });
      res.redirect("personal");
    } else {
      res.render("persona/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "Los Campos nombre y descripción son requeridos.",
      });
    }
  } catch (error) {
    res.render("persona/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo el personal. Error:" + error,
    });
  }
});
router.get("/agregar", async function (req, res, next) {
  var personal = await personalModel.getPersonal();
  res.render("persona/agregar", {
    layout: "admin/layout",
    personal,
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var persona = await personalModel.getPersona(id);
  console.log(persona);
  res.render("persona/modificar", {
    layout: "admin/layout",
    persona,
  });
});

router.get("/delete/:id", async function (req, res, next) {
  var id = req.params.id;
  await personalModel.deletePersona(id);
  res.redirect("/personal");
});
/**
 * id, nombre, linkimagen, descripcion
 */
router.post("/modificar", async function (req, res, next) {
  try {
    let linkimagen = req.body.imagenActual;
    let imagenVieja = false;

    if (req.body.eliminarImagen === "1") {
      linkimagen = null;
      imagenVieja = true;
    }
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      linkimagen = (await uploader(imagen.tempFilePath)).public_id;
      imagenVieja = true;
    }
    if (imagenVieja && req.body.imagenActual) {
      await destroy(req.body.imagenActual);
    }

    var obj = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      linkimagen
    };

    await personalModel.updatePersona(obj, req.body.id);
    res.redirect("/personal");
  } catch (error) {
    res.render("persona/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico el personal. Error:" + error,
    });
  }
});

module.exports = router;
