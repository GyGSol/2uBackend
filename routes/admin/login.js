var express = require("express");
var router = express.Router();

const userModel = require("./../../models/userModel");

router.get("/", function (req, res, next) {
  res.render("admin/login", {
    layout: "admin/layout",
  });
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.render("admin/login", {
  layout: "admin/layout",
  });
});

router.post("/", async (req, res, next) => {
  try {
    var user = req.body.user;
    var pass = req.body.pass;
    var data = await userModel.getUser(user, pass);

    if (data != undefined) {
      req.session.idUser = data.id;
      req.session.usuario= data.usuario;
      req.session.rol= data.rol;
      if(data.rol == 'ADMINISTRADOR'){
        req.session.isAdmin = true;
      }else{
        req.session.isAdmin = false;
      }
      res.redirect("/admin/principal");
    } else {
      res.render("admin/login", {
        layout: "admin/layout",
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
