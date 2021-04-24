const mysql = require("mysql");
const util = require("util");

//consulta en crudo : select * FROM usuarios
//para poryectos mas grandes usamos usamos query builders (knex)
const pool = mysql.createPool({
 
    host : process.env.BD_HOST  || 'localhost',
    port : process.env.BD_PORT ||3306,
    password : process.env.BD_PASSWORD ||'',
    user : process.env.BD_USER||'root',
    database: 'consigna 1', //aca va la base de datos, no la tabla.
    connectionLimit : 10// si se sobrepasa de 10 se me meten las consultas en una cola FIFO
    //(firts in firts out)
});
//asi conectamos la base de datos.
// que es una pool? una pool es una cola de conexiones reccurenter max 10 conx.
//si tengo varias consultas que dependen unas de otras sql 1ro las ejecuta en una especie de "cache" si hay un error "vuelve para atras"(rollback) y sino las ejecuta en la pag. Para esto las querys tiene que ser ASYNC.
//pool.query("SELECT * FROM usuarios ")
// util.promisefy me lo convierte en promesa.

pool.query = util.promisify(pool.query)
//evita callback hell
module.exports = pool;