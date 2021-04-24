var express = require('express');
var router = express.Router();
const {auth} = require('../models/usuarios');
const sha1 = require("sha1")

const get = (req, res) =>{
  res.render('login');
}
const login = async(req, res)=>{
try{
  req.body.pass = sha1(req.body["pass"]);
  var obj = req.body;
  console.log(obj)
  var result = await auth(obj);
  console.log(result)
if(result.length === 0){
  res.render('login', {message: "usuario o contraseña incorrecta"})
}
  const [{id, admin}] = result;
  console.log(id, admin);
  req.session.idUser = id; //variable super global
  req.session.admin = admin;
  res.redirect('/admin/trabajadores');
}

catch(e){
  console.log(e);
}
}
 
router.get('/', get);
router.post('/', login);
module.exports = router;