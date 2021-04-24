 const verifyAdmin = (req, res, next) => {   
     req.session.idUser  &&  req.session.admin == 1//condicion
   
    ? (next())// se cumple
   
    :res.redirect('/pagInfo');
 }
 const verifyUser = (req, res, next) => {   
    req.session.idUser //condicion
  
   ? (next())// se cumple
  
   :res.redirect('/login');
}

module.exports = {verifyAdmin, verifyUser}