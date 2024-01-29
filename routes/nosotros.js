var express = require("express");
var router = express.Router();
var nosotrosModel = require("../models/nosotrosModel");

var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get("/", async function (req, res, next) {
  var nosotros = await nosotrosModel.getNosotros();
  nosotros = nosotros.map((nos) => {
    if (nos.linkimagen) {
      const imagen = cloudinary.image(nos.linkimagen, {
        width: 70,
        height: 100,
        crop: "fill",
      });
      return {
        ...nos,
        imagen,
      };
    } else {
      return {
        ...nos,
        imagen: "",
      };
    }
  });

  res.render("nosotros", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    nosotros,
  });
});
/**
 * id, tetxo1,texto2,texto3
 */
router.post("/", async (req, res, next) => {
  try {
    var linkimagen = "";

    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      linkimagen = (await uploader(imagen.tempFilePath)).public_id;
    }
    if (req.body.texto1 !== "" && req.body.texto2 !== "" && req.body.texto3 !== "") {
      await nosotrosModel.addNosotros({
        ...req.body,
        linkimagen,
      });
      res.redirect("nosotros");
    } else {
      res.render("nosotros/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje: "Los campos texto 1, 2 y 3 son requeridos.",
      });
    }
  } catch (error) {
    res.render("nosotros/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo. Error:" + error,
    });
  }
});
router.get("/agregar", async function (req, res, next) {
  var nosotros = await nosotrosModel.getNosotros();
  res.render("nosotros/agregar", {
    layout: "admin/layout",
    nosotros,
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var nosotros = await nosotrosModel.getNos(id);
  res.render("nosotros/modificar", {
    layout: "admin/layout",
    nosotros,
  });
});

router.get("/delete/:id", async function (req, res, next) {
  var id = req.params.id;
  var resultado = await nosotrosModel.deleteNosotros(id);
  res.redirect("/menosotros");
});
/**
 * id, texto1, texto2, texto3
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
      texto1: req.body.texto1,
      texto2: req.body.texto2,
      texto3: req.body.texto3,
      linkimagen
    };
    await nosotrosModel.updateNosotros(obj, req.body.id);
    res.redirect("/nosotros");
  } catch (error) {
    res.render("nosotros/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico el Mes. Error:" + error,
    });
  }
});

module.exports = router;