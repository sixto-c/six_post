var express = require('express');
var router = express.Router();

/* GET home page. */
 const registro = ('/',(req, res) => {
  res.render('registro');
});
router.get('/', registro)
module.exports = router;