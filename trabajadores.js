var express = require('express');
var router = express.Router();
const model = require('../../models/trabajadores')

//para ver todos los trabajadores

const all = async (req, res) =>{
    var status = true;
    const trabajadores = await model.get(status);
    res.render('trabajadores', {trabajadores, status});
}
const allFalse = async (req, res) => {
    var status = false;
    const trabajadores = await model.get(status);
    res.render('trabajadores', {trabajadores, status});
}
//para ver solo a un trabajador
const single = async(req, res) =>{
    const id = req.params.id;
    const trabajador = await model.single(id);
    res.render('trabajador', {trabajador}) //aca le digo que lo muestro en el trabajador.hbs
}
//para conectar a un a la funcion 
const create = async(req, res) =>{
    const obj = req.body;//aca pedo: pasame lo que tenes en el body
    console.log(obj);
    const nuevoEmpleado = await model.create(obj)//aca obtengo definitivamente lo que le pedi en el body.
    res.redirect('/admin/trabajadores')//aca lo rediccione a /trabajadores
}
//este es parte del create pero lo puso se parado porque este es para que se vea y en el arriba puso para que se renderice
const getCreate = (req, res) => {
    res.render('agregarEmpleado');
}
const getUpdate = async (req, res) => {
    const id = req.params.id;                         //esto para que se vean los datos de los trab
    const trabajador = await model.single(id);
    res.render('modificarEmpleado', {trabajador});
}

const update = async(req, res)=>{
    const id = req.params.id;
    const obj = req.body;
    console.log(obj);
    const modificar = await model.update(id, obj);
    res.redirect('/admin/trabajadores'); 
    
}
const borrar = async(req,res)=>{
    const status = false;
    const id = req.params.id;
    const borrado = await model.borrar(id, status);
    res.redirect('/admin/trabajadores');
}
const habilitar = async(req,res)=>{
    const status = true;
    const id = req.params.id;
    const borrado = await model.borrar(id, status);
    res.redirect('/admin/trabajadores');
}
const get = (req, res)=>{
    res.render('mensaje')
}
const men = async(req, res)=>{
    const mens = req.body;
    console.log(mens);
    const envMen = await model.mensaje(mensaje)
    console.log(obj);
    res.redirect('/admin/usuarios');
}




//aca conectamos las funciones de models con router.

router.get('/', all)
router.get('/single/:id', single);
router.post('/create', create);
router.get('/create', getCreate);
router.get('/update/:id', getUpdate);
router.post('/update/:id', update);
router.get('/delete/:id', borrar);
router.get('/disabled', allFalse);
router.get('/disabled/:id', habilitar);
router.get('/mensaje', get)
router.post('/send' ,men)



module.exports = router