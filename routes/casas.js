var express = require("express");
var router = express.Router();
var casasModel = require("../models/casasModel");
var propietariosModel = require("../models/propietariosModel");
var vistasModel = require("../models/vistasModel");
var areasModel = require("../models/areasModel");


var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get("/", async function (req, res, next) {
  
  var casas = await casasModel.getCasas();

  casas = casas.map((casa) => {
    if (casa.linkimagen) {
      const imagen = cloudinary.image(casa.linkimagen, {
        width: 100,
        height: 70,
        crop: "fill",
      });
      return {
        ...casa,
        imagen,
      };
    } else {
      return {
        ...casa,
        imagen: "",
      };
    }
  });

  res.render("casas", {
    layout: "admin/layout",
    userName: req.session.usuario,
    rol: req.session.rol,
    casas,
  });
});
/**
 * id, nombre, dormitorios, linkpdf, linkvideo, linkimagen, propietario, baños, pax
 */
router.post("/", async (req, res, next) => {
  try {
    var linkimagen = "";

    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      linkimagen = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (
      req.body.nombre !== "" &&
      req.body.dormitorios !== "" &&
      req.body.linkpdf !== "" &&
      req.body.linkvideo !== "" &&
      req.body.banos !== ""
    ) {
      await casasModel.addCasas({
        ...req.body,
        linkimagen,
      });
      res.redirect("casas");
    } else {
      res.render("casa/agregar", {
        layout: "admin/layout",
        error: true,
        mensaje:
          "Los Campos nombre, dormitorios, linkpdf, linkvideo, linkimagen, propietario y baños son requeridos.",
      });
    }
  } catch (error) {
    res.render("casa/agregar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se cargo la casa. Error:" + error,
    });
  }
});
router.get("/agregar", async function (req, res, next) {
  var propietarios = await propietariosModel.getPropietarios();
  var vistas = await vistasModel.getVistas();
  var areas = await areasModel.getAreas();
  res.render("casa/agregar", {
    layout: "admin/layout",
    propietarios,
    vistas,
    areas
  });
});

router.get("/modificar/:id", async function (req, res, next) {
  var id = req.params.id;
  var casa = await casasModel.getCasa(id);
  var propietarios = await propietariosModel.getPropietarios();
  var vistas = await vistasModel.getVistas();
  var areas = await areasModel.getAreas();
  
  res.render("casa/modificar", {
    layout: "admin/layout",
    casa,
    propietarios,
    vistas,
    areas
  });
});

router.get("/delete/:id", async function (req, res, next) {
  var id = req.params.id;
  let casa = await casasModel.getCasa(id);
  if (casa.linkimagen) {
    await destroy(casa.linkimagen);
  }
  await casasModel.deleteCasa(id);
  res.redirect("/casas");
});
/**
 * id, id, nombre, dormitorios, linkpdf, linkvideo, linkimagen, propietario, banos, vista
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
      dormitorios: req.body.dormitorios,
      linkpdf: req.body.linkpdf,
      linkvideo: req.body.linkvideo,
      propietario: req.body.propietario,
      banos: req.body.banos,
      vista: req.body.vista,
      area: req.body.area,
      pax: req.body.pax,
      linkimagen,
    };
    console.log(obj);
    await casasModel.updateCasa(obj, req.body.id);
    res.redirect("/casas");
  } catch (error) {
    res.render("casa/modificar", {
      layout: "admin/layout",
      error: true,
      mensaje: "No se modifico el casa. Error:" + error,
    });
  }
});

module.exports = router;
