var express = require('express');
var router = express.Router();

const get = (req, res)=>{
    res.render('pagina')
}
router.get('/', get);
module.exports = router;