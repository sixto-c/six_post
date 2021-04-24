const { Router } = require('express');
const express = require('express');
const router = express.Router();
const model = require('../../models/usuarios');

const get = async(req, res)=>{
   const usuarios = await model.get(true);
    res.render('usuarios', {usuarios})
}
const convert = async(req, res)=>{
    const id = req.params.id;
    const user =  await model.single(id);
    var admin = 0;
    user.forEach(usuario => {
        if(usuario.admin == 0){
            admin = 1;
        }
    });
    const convertir = await model.convert(admin, id);
    res.redirect('/admin/usuarios')
}

const borrar = async(req,res)=>{
    const status = false;
    const id = req.params.id;
    const borrado = await model.borrar(id, status);
    res.redirect('/admin/usuarios');
}
router.get('/', get);
router.get('/convert/:id', convert);
router.get('/delete/:id', borrar);
module.exports = router;
