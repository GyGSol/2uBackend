var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var port = normalizePort(process.env.PORT || '3030');
server.listen(port);

var indexRouter = require('./routes/index');

var loginRouter = require('./routes/admin/login');

var clientesRouter = require('./routes/clientes');
var preciosRouter = require('./routes/precios');
var casasRouter = require('./routes/casas');
var mesesRouter = require('./routes/meses');
var principalRouter = require('./routes/admin/principal');
var propietariosRouter = require('./routes/propietarios');
var vistasRouter = require('./routes/vistas');
var usuariosRouter = require('./routes/usuarios');
var ocupacionesRouter = require('./routes/ocupaciones');
var areasRouter = require('./routes/areas');
var nosotrosRouter = require('./routes/nosotros');
var contactosRouter = require('./routes/contactos');
var personalRouter = require('./routes/personal');

var session = require('express-session');
var fileUpload = require('express-fileupload');
var cors = require('cors');

var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: "2ubz",
    resave: false,
    saveUninitialized: true,
  })
);
secured = async (req,res,next) => {
  try {
    if(req.session.idUser){
     next();
    }else{
      res.redirect("/admin/login");
    }
  } catch (error) {
    
  }
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

app.use('/', indexRouter);

app.use('/admin/login', loginRouter);
app.use('/admin/principal',secured, principalRouter);

app.use('/clientes',secured, clientesRouter);
app.use('/precios',secured, preciosRouter);
app.use('/meses',secured, mesesRouter);
app.use('/casas',secured, casasRouter);
app.use('/propietarios',secured, propietariosRouter);
app.use('/vistas',secured, vistasRouter);
app.use('/usuarios',secured, usuariosRouter);
app.use('/ocupaciones',secured, ocupacionesRouter);
app.use('/areas',secured, areasRouter);
app.use('/api',cors(), apiRouter);
app.use('/nosotros',secured, nosotrosRouter);
app.use('/contactos',secured, contactosRouter);
app.use('/personal',secured, personalRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
