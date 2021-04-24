const express = require('express');
const router = express.Router();
const model = require('../models/crearUsuario');
const sha1 = require('sha1')//esto me encripta mi pass



const get = async(req, res)=>{
    const creaUsuarios = await model.get(true);
     res.render('crearUsuario')
 }
const create = async(req, res)=>{
    req.body.pass = sha1(req.body.pass);//esto me encripta mi pass
    const obj = req.body;
    var newUser =  await model.create(obj);
    //res.render('crearUsuario',  {message : "usuario creado"});
    res.redirect('/pagInfo');
}
router.get('/', get);
router.post('/create',create);
router.get('/create', (req, res) => res.render('crearUsuario'));
module.exports = router;
