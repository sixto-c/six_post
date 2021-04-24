var express = require('express');
var router = express.Router();

const get = (req, res)=>{
    res.render('pagInfo')
}
router.get('/', get);


module.exports = router;