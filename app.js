var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const dotenv = require('dotenv');
const {verifyAdmin, verifyUser} = require('./middlewares/auth');
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registroRouter = require('./routes/registro')
var loginRouter = require('./routes/login');
var trabajadoresRouter = require('./routes/admin/trabajadores');
var usuariosRouter = require('./routes/admin/usuarios');
var crearUsuarioRouter = require('./routes/crearUsuario');
var pagInfoRouter = require('./routes/pagInfo');
var paginaRouter = require('./routes/pagina');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({//mirar su funcion en npm.session
secret : 'pass secreto',//toda la inf de la pass va a aparecer como pass secreto
cookie : {maxAge : null},//cuanto va a expirar nuestra session?.. nosotros no queremos que expire, so null.
resave : true,
saveUninitialized : false//cuando se cae el servidor, cierra la sesion.
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registro', registroRouter)
app.use('/login', loginRouter);
app.use('/admin/trabajadores',verifyAdmin, trabajadoresRouter);
app.use('/admin/usuarios',verifyAdmin, usuariosRouter);
app.use('/crearUsuario', crearUsuarioRouter);
app.use('/pagInfo',verifyUser, pagInfoRouter);
app.use('/pagina', paginaRouter);


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